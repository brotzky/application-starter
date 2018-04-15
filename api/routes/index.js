import { Router } from 'express';
import UserRoutes from '../modules/users/Users.routes';

const router = new Router();

router.use(UserRoutes);

export default router;
