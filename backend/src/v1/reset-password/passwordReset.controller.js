// src/v1/password-reset/passwordReset.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../../knex');  // Use Knex instance for MySQL queries
const sendMail = require('../../utils/mailService');  // Send email service
require('dotenv').config();

// Request password reset - Send the reset email
const requestPasswordReset = (req, res) => {
    const { email } = req.body;

    // Check if user exists in the database
    db('users').where({ email }).first().then(user => {
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Generate a password reset token (expires in 1 hour)
        const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        // Create reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        // const emailBody = `Click the link to reset your password: ${resetLink}`;
        const emailBody = `
Hello,

We received a request to reset your password. If you did not make this request, please ignore this email.

To reset your password, please click the link below:

[Reset Password](${resetLink})

If the button does not work, you can copy and paste the following link into your web browser:
${resetLink}

Thank you,
Inventory Management System-IMS.
`;

        console.log(emailBody);

        // Send email with the reset link
        sendMail(user.email, 'Password Reset Request', emailBody)
            .then(() => res.status(200).json({ message: 'Password reset email sent' }))
            .catch((error) => {
                console.error('Error sending email:', error);
                res.status(500).json({ message: 'Error sending email' });
            });
    }).catch(err => {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    });
};

// Reset password - Token verification and password update
const resetPassword = (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verify the reset token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user by email (from the token)
        db('users').where({ email: decoded.email }).first().then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Hash the new password
            bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return res.status(500).json({ message: 'Error updating password' });
                }

                // Update password in the database
                db('users')
                    .where({ email: user.email })
                    .update({ password: hashedPassword })
                    .then(() => res.status(200).json({ message: 'Password reset successfully' }))
                    .catch((error) => {
                        console.error('Error updating password:', error);
                        res.status(500).json({ message: 'Error updating password' });
                    });
            });
        }).catch(err => {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Internal server error' });
        });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

module.exports = {
    requestPasswordReset,
    resetPassword,
};
