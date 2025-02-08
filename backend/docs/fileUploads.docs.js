/**
 * @swagger
 * tags:
 *   name: File Uploads
 *   description: File upload and retrieval operations
 */

/**
 * @swagger
 * /api/v1/user/files/get-presigned-url:
 *   get:
 *     summary: Get a presigned URL for file upload
 *     tags: [File Uploads]
 *     responses:
 *       200:
 *         description: Returns presigned URL
 */

/**
 * @swagger
 * /api/v1/user/files/get-presigned-urls-for-get:
 *   get:
 *     summary: Get presigned URLs for downloading files
 *     tags: [File Uploads]
 *     responses:
 *       200:
 *         description: Returns presigned URLs
 */

/**
 * @swagger
 * /api/v1/user/files/files:
 *   get:
 *     summary: List all uploaded files
 *     tags: [File Uploads]
 *     responses:
 *       200:
 *         description: Returns file list
 */
