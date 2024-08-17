import express from 'express';
const routerCategory = express.Router();
import { authenticated } from '../middleware/auth';
import { checkAdminRoleMiddleware } from '../middleware/checkRoleAdmin';
import { CategoryController } from "../controllers/Admin/CategoryController";


/**
 * @openapi
 * /api/v1/category/store:
 *   post:
 *     summary: Create a new category.
 *     tags:
 *       - Category
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
 *                 description: The name of the category to be created.
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: Electronics
 *                 description:
 *                   type: string
 *                   example: Category for electronic products
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Admin role required.
 *       500:
 *         description: Internal Server Error.
 */
routerCategory.post("/store", authenticated, checkAdminRoleMiddleware, CategoryController.store.bind(CategoryController));

/**
 * @openapi
 * /api/v1/category/edit/{id}:
 *   put:
 *     summary: Edit an existing category.
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Electronics
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: Updated Electronics
 *       401:
 *         description: Unauthorized. Authentication required.
 *       403:
 *         description: Forbidden. Admin role required.
 *       404:
 *         description: Not Found. Category ID does not exist.
 *       500:
 *         description: Internal Server Error.
 */
routerCategory.put("/edit/:id", authenticated, checkAdminRoleMiddleware, CategoryController.edit.bind(CategoryController));

export default routerCategory;
