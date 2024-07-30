import express from "express";
const router = express.Router();
import authRoutes from "./authRoutes";
import roleRoutes from "./RoleRoutes";
import routerUser from "./userRoutes";
import routerProfile from "./profileRoutes";
import routerCategory from "./categoryRoutes";
import uploadRouter from "./fileRoutes";
import ProductRouter from  "./productRoutes"
import PaymentRouter from "./paymentRoutes";
router.use(authRoutes);
router.use("/api/v1/admin/roles", roleRoutes);
router.use("/api/v1/admin/users", routerUser);
router.use("/api/v1/profiles",routerProfile);
router.use("/api/v1/admin/categories", routerCategory);
router.use("/api/v1/upload",uploadRouter);
router.use("/api/v1/products",ProductRouter);
router.use(PaymentRouter);

export default router;
