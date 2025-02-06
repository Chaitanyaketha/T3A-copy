// src/v1/password-reset/passwordReset.routes.js
const express = require('express');
const router = express.Router();
const { requestPasswordReset, resetPassword } = require('./passwordReset.controller');

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;
