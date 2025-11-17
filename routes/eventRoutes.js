import express from 'express';
import {
  getAllEvents,
  getEventById,
  getEventStalls,
  createEvent
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const r = express.Router();

r.get('/', getAllEvents);
r.get('/:id', getEventById);
r.get('/:id/stalls', getEventStalls);
r.post('/', protect, createEvent);

export default r;
