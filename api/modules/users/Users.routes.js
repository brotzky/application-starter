import { Router } from 'express';
import UserController from './Users.controller';

const router = new Router();

// Get all jobs
router.route('/users').get(UserController.getUsers);

// Create a new job
router.route('/users').post(UserController.createUser);

// Get one job by ID
router.route('/users/:userId').get(UserController.getUser);

// Get one job by ID
router.route('/users/:userId').delete(UserController.deleteUser);

export default router;
