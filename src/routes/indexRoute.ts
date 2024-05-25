import express from 'express';
const router = express.Router();
import authRoutes from './authRoutes';
import roleRoutes from './RoleRoutes';

router.use(authRoutes);
router.use('/api/v1/admin/roles', roleRoutes);

export default router;
