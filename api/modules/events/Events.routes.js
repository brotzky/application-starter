import { Router } from 'express';
import EventsController from './Events.controller';

const router = new Router();

// Get all events
router.route('/e').get(EventsController.getEvents);

// Get event
router.route('/e/:id').get(EventsController.getEvent);

// Create a new event
router.route('/e').post(EventsController.createEvent);

export default router;
