/**
 * @swagger
 * tags:
 *   name: File Uploads
 *   description: File upload and retrieval operations
 */

/**
 * @swagger
 * /get-presigned-url:
 *   get:
 *     summary: Get a presigned URL for file upload
 *     tags: [File Uploads]
 *     responses:
 *       200:
 *         description: Returns presigned URL
 */

/**
 * @swagger
 * /get-presigned-urls-for-get:
 *   get:
 *     summary: Get presigned URLs for downloading files
 *     tags: [File Uploads]
 *     responses:
 *       200:
 *         description: Returns presigned URLs
 */

/**
 * @swagger
 * /files:
 *   get:
 *     summary: List all uploaded files
 *     tags: [File Uploads]
 *     responses:
 *       200:
 *         description: Returns file list
 */
