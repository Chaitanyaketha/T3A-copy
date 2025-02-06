/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /getProducts:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Returns list of products
 */

/**
 * @swagger
 * /editProduct/{productId}:
 *   put:
 *     summary: Edit a product
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 */

/**
 * @swagger
 * /deleteProduct/{productId}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */

/**
 * @swagger
 * /getCategories:
 *   get:
 *     summary: Get product categories
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Returns list of categories
 */

/**
 * @swagger
 * /getVendors:
 *   get:
 *     summary: Get vendors list
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Returns vendor list
 */

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: Product added successfully
 */

/**
 * @swagger
 * /cart/addItems:
 *   post:
 *     summary: Add items to cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Items added to cart
 */

/**
 * @swagger
 * /cart/items:
 *   get:
 *     summary: Get cart items
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Returns cart items
 */

/**
 * @swagger
 * /cart/decreaseQuantity:
 *   post:
 *     summary: Decrease item quantity in cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Quantity updated
 */

/**
 * @swagger
 * /cart/increaseQuantity:
 *   post:
 *     summary: Increase item quantity in cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Quantity updated
 */

/**
 * @swagger
 * /cart/remove/{Cart_ID}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     parameters:
 *       - name: Cart_ID
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from cart
 */
