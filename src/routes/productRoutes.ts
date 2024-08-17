
import express from 'express';
import { ProductController } from '../controllers/ProductController';
const routerProduct = express.Router();
import { authenticated } from '../middleware/auth';

/**
 * @openapi
 * /api/v1/products/store:
 *   post:
 *     summary: Create a new product.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *                 example: samsung A21
 *               category_id:
 *                 type: string
 *                 description: The ID of the category the product belongs to.
 *                 example: "2"
 *               description:
 *                 type: string
 *                 description: A detailed description of the product.
 *                 example: td;,vdfl,gdsfkgmdlfhmflhkm
 *               price:
 *                 type: string
 *                 description: The price of the product.
 *                 example: "2000"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of image filenames associated with the product.
 *                 example: ["2b4861ea1186e1453d86.png", "88d83f0519e29ce40a13.png"]
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Bad request. Invalid data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       500:
 *         description: Internal Server Error.
 */
routerProduct.post('/store', authenticated, ProductController.create.bind(ProductController));

/**
 * @openapi
 * /api/v1/products/edit/{id}:
 *   put:
 *     summary: Edit an existing product.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *                 example: samsung A21
 *               category_id:
 *                 type: string
 *                 description: The ID of the category the product belongs to.
 *                 example: "2"
 *               description:
 *                 type: string
 *                 description: A detailed description of the product.
 *                 example: Updated description
 *               price:
 *                 type: string
 *                 description: The price of the product.
 *                 example: "2000"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of image filenames associated with the product.
 *                 example: ["2b4861ea1186e1453d86.png", "88d83f0519e29ce40a13.png"]
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       400:
 *         description: Bad request. Invalid data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal Server Error.
 */
routerProduct.put('/edit/:id', authenticated, ProductController.edit.bind(ProductController));

/**
 * @openapi
 * /api/v1/products/list/{id}:
 *   get:
 *     summary: Get a list of products or a specific product by ID.
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve. If not provided, all products will be listed.
 *     responses:
 *       200:
 *         description: A list of products or a specific product.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     example: samsung A21
 *                   category_id:
 *                     type: string
 *                     example: "2"
 *                   description:
 *                     type: string
 *                     example: td;,vdfl,gdsfkgmdlfhmflhkm
 *                   price:
 *                     type: string
 *                     example: "2000"
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["2b4861ea1186e1453d86.png", "88d83f0519e29ce40a13.png"]
 *       401:
 *         description: Unauthorized. Authentication required.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal Server Error.
 */
routerProduct.get("/list/:id?", authenticated, ProductController.list.bind(ProductController));

export default routerProduct;
