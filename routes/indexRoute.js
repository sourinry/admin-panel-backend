import express from 'express';
const router = express.Router();

import userRoutes  from './userRoutes.js'
import whatsappRoutes from './whatsappRoutes.js';
import roleRoutes from './roleRoute.js';

router.use('/user', userRoutes);
router.use('/whatsapp', whatsappRoutes);
router.use('/role', roleRoutes);

export default router;