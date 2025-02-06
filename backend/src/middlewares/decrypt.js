const crypto = require('crypto-js');
require('dotenv').config();

function decryptRequestBody(req, res, next) {
  
    if (req.body.encryptedData  ) {
      
        try {
            const bytes = crypto.AES.decrypt(req.body.encryptedData, process.env.crypto_key);
            const decryptedString = bytes.toString(crypto.enc.Utf8);

            if (!decryptedString) {
                next();
            }

            req.body = JSON.parse(decryptedString);
        } catch (err) {
            console.error('Decryption error:', err);
            return res.status(400).json({ error: 'Failed to decrypt data' });
        }
    }
 
    next();
}


function encryptResponseBody(req, res, next) {

    console.log(process.env.crypto_key);
    const send = res.send;
    res.send = function (body) {
        if (body) {
            try {
                const encryptedData = crypto.AES.encrypt(JSON.stringify(body), process.env.crypto_key).toString();
                body = { encryptedData };
            } catch (err) {
                console.error('Encryption error:', err);
                return res.status(500).json({ error: 'Failed to encrypt data' });
            }
        }
        send.call(this, body);
    };
    
    next();
}

module.exports = { decryptRequestBody, encryptResponseBody };
