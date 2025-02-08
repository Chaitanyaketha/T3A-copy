
// const winston = require('winston');
// const { format } = winston;

// const logger = winston.createLogger({
//   level: 'info',
//   format: format.combine(
//     format.timestamp(),
//     format.json()  
//   ),
//   transports: [
   
//     new winston.transports.File({
//       filename: 'logs/app.log', 
//       maxsize: 20 * 1024 * 1024,
//       maxFiles: 1, 
//       tailable: true 
//     }),
    
//   ],
// });


// logger.exceptions.handle(
//   new winston.transports.File({ filename: 'logs/exceptions.log' })
// );

// module.exports = logger;

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// Create a transport for rotating daily log files
const transport = new DailyRotateFile({
    filename: 'logs/%DATE%-results.log',  // directory and filename format
    datePattern: 'YYYY-MM-DD',            // Define the date format
    zippedArchive: true,                   // Compress log files
    maxSize: '20m',                        // Max size of a log file before rotating
    maxFiles: '30d'                        // Retain logs for 30 days
});

// Setup logger with the transport
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Format logs as JSON for structured logging
    ),
    transports: [
        transport, // Add the daily rotate file transport
        new winston.transports.Console({ // Log to console for real-time monitoring
            format: winston.format.simple()
        })
    ],
});

// Handle unhandled exceptions
logger.exceptions.handle(
    new winston.transports.File({ filename: 'logs/exceptions.log' })
);

module.exports = logger; // Export the logger