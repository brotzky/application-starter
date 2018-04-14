import { Router } from 'express';
import EventRoutes from '../modules/events/Events.routes';
import UserRoutes from '../modules/users/Users.routes';

const router = new Router();

router.use(EventRoutes);
router.use(UserRoutes);

export default router;
