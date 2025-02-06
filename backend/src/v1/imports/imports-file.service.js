const cron = require('node-cron');
const knex = require('knex');
const knexConfig = require('../../../knexfile.js');
const db = knex(knexConfig.development);
const { addProduct } = require('../Dashboardpagination/pagination.service.js')
const axios = require('axios');   //for aws http calls
const XLSX = require('xlsx');
const Joi = require('joi');
const AWS = require('aws-sdk'); //optinl used when the getobject is used
const fs = require('fs');
const path = require('path');
const { promisify } = require('util'); 
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const recordSchema = Joi.object({
  product_name: Joi.string().required(),
  category_name: Joi.string()
    .valid(
      'Books & Stationery',
      'Electronics',
      'Furniture',
      'Clothing',
      'Food & Beverages',
      'Health & Beauty',
      'Sports & Outdoors',
      'Toys & Games',
      'Office Supplies'
    )
    .required(),
  vendor_name: Joi.string()
    .valid('Zomato', 'Blinkit', 'Swiggy', 'Amazon', 'Flipkart')
    .insensitive()
    .required(),
  unit_price: Joi.number().positive().required(),
  quantity_in_stock: Joi.number().positive().required(),
});



//upload 1st
const uploadToS3 = async (filePath, fileName) => {
  try {
    const fileContent = await promisify(fs.readFile)(filePath);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `invalid_records/${fileName}`,
      Body: fileContent,
      ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

//for the invalid files here it gets 
const createInvalidRecordsExcel = async (invalidRecords, fileName) => {
  try {
    const formattedRecords = invalidRecords.map(record => ({
      ...record,
      reason: record.reason.join('; '),
    }));

    const ws = XLSX.utils.json_to_sheet(formattedRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Invalid Records');

    const filePath = path.join(__dirname, fileName);
    XLSX.writeFile(wb, filePath);

    return filePath;
  } catch (error) {
    console.error('Error creating Excel file:', error);
    throw error;
  }
};

//DB extraction
const getRecords = async () => {
  console.log("Worker starting");

  try {

    const record = await db('import')
      .where({ status: 0 })
      .whereNull('locked_at')  // Ensure record is not already locked
      .orderBy('id', 'asc')     
      .forUpdate()              
      .first();

    console.log("worker working ", record);  // Add this log to check the fetched record

    if (!record) {
      console.log(`Worker ${process.pid}: No records to process.`);
      return;
    }

    await db('import')
      .where('id', record.id)
      .update({
        locked_at: new Date(),
        process_id: process.pid,
      });

    console.log(`Worker ${process.pid}: Locked record ${record.id}`);


    const data = await downloadFileFromS3(record.file_path);
    console.log("Worker", process.pid, "Data downloaded:", data);

    const validRecords = [];
    const invalidRecords = [];


    for (let row of data) {
      const validationErrors = validateRecord(row);
      if (validationErrors.length === 0) {
        validRecords.push(row);
      } else {
        invalidRecords.push({ ...row, reason: validationErrors });
      }
    }

   
//invalid data url create
    let s3Urldata = null;  //for the invalid records we will update the url in db

    if (validRecords.length > 0) {
      for (let row of validRecords)
        try {
          await addProduct(row);
        } catch (err) {
          invalidRecords.push(row);
        }
    }
    if (invalidRecords.length > 0) {
      const fileName = `invalid_records_${Date.now()}.xlsx`;
      const filePath = await createInvalidRecordsExcel(invalidRecords, fileName);
      console.log("Worker", process.pid, "Created invalid records Excel file", filePath);

      s3Urldata = await uploadToS3(filePath, fileName);
      console.log(`Worker ${process.pid}: Uploaded invalid records to ${s3Urldata}`);
      fs.unlinkSync(filePath);
    }


    await db('import')
      .where('id', record.id)
      .update({
        status: 1,
        wrong_path: s3Urldata,
        locked_at: null,
        valid_records:validRecords.length,
        invalid_records:invalidRecords.length
      });

    console.log(`Worker ${process.pid}: Successfully processed record ${record.id}`);

  } catch (err) {
    console.error(`Worker ${process.pid}: Error processing records - ${err.message}`);
  }
};





const validateRecord = (record) => {
  const { error } = recordSchema.validate(record, { abortEarly: false });  //can make it true whwn need to stop at 1st error
  return error ? error.details.map((err) => err.message) : [];
};


const downloadFileFromS3 = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = response.data;

    console.log('Content-Type:', response.headers['content-type']);

    const fileType = response.headers['content-type'];
    if (fileType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      throw new Error('The file is not a valid Excel (.xlsx) file.');
    }

    const parsedData = parseExcelData(buffer);
    console.log('Parsed Data:', parsedData);
    return parsedData;

  } catch (err) {
    console.error('Error downloading or processing the file:', err);
    throw err;
  }
};

//data parsing
const parseExcelData = (buffer) => {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });

    console.log('Sheet Names:', workbook.SheetNames);

    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]];

    console.log('Raw Sheet Content:', sheet);

    const rows = XLSX.utils.sheet_to_json(sheet, { raw: true });
    if (rows.length === 0) {
      console.log('Sheet appears to be empty or not properly structured.');
    }

    const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: true });
    console.log('Parsed Data:', jsonData);
    return jsonData;
  } catch (err) {
    console.error('Error parsing Excel data:', err);
    throw err;
  }
};


//add to table
const insertImportData = async (filePath, status, file_name) => {
  try {
    console.log(filePath);
    await db('import').insert({ file_path: filePath, file_name: file_name, status: status });
  } catch (err) {
    throw new Error('Error inserting data into the database: ' + err.message);
  }
};
const exportData = async () => {
  try {
    const a = await db('import');

    return a;
  }
  catch {

  }
}


cron.schedule("*/2 * * * *", () => {    //checks for every 2min of time..
  
  console.log("Task executed at:", new Date().toLocaleString());
  getRecords();
});


module.exports = { insertImportData, exportData }; 
