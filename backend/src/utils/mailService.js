// // src/utils/mailService.js
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const sendMail = (to, subject, body) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             // user: process.env.MAIL_USER,
//             // pass: process.env.MAIL_PASS,
//             user:'chaitanyaketha15@gmail.com',
//             pass:'Nani#7582',
//         },
//     });

//     const mailOptions = {
//         from: process.env.MAIL_USER,
//         to,
//         subject,
//         text: body,
//     };

//     return transporter.sendMail(mailOptions);
// };

// module.exports = sendMail;


// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const transporter = nodemailer.createTransport({
//     host: 'smtp-relay.brevo.com',
//     port: 587,
//     auth: {
//         user: process.env.BREVO_USER, // Your Brevo SMTP login
//         pass: process.env.BREVO_PASS  // Your Brevo SMTP password
//     }
// });

// const sendMail = async (to, subject, text) => {
//     try {
//         await transporter.sendMail({
//             from: process.env.SENDER_EMAIL, 
//             to,
//             subject,
//             text
//         });
//         console.log('Email sent successfully');
//     } catch (error) {
//         console.error('Error sending email:', error.message);
//     }
// };

// module.exports = sendMail;


const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,  // false for TLS
    auth: {
        user: process.env.BREVO_USER, // Your Brevo SMTP login
        pass: process.env.BREVO_PASS  // Your Brevo SMTP password
    }
});

const sendMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,  // The email you verified in Brevo
            to,
            subject,
            text
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

module.exports = sendMail;
