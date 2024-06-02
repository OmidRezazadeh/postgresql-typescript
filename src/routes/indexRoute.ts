import express from "express";
const router = express.Router();
import authRoutes from "./authRoutes";
import roleRoutes from "./RoleRoutes";
import routerUser from "./userRoutes";
router.use(authRoutes);
router.use("/api/v1/admin/roles", roleRoutes);
router.use("/api/v1/admin/users", routerUser);

export default router;
