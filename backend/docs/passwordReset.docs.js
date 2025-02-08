/**
 * @swagger
 * tags:
 *   name: Password Reset
 *   description: Password reset related endpoints
 */

/**
 * @swagger
 * /api/v1/password-reset/request-password-reset:
 *   post:
 *     summary: Request a password reset link
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Reset link sent
 *       400:
 *         description: Email not found
 */

/**
 * @swagger
 * /api/v1/password-reset/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Password Reset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "random-token"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
