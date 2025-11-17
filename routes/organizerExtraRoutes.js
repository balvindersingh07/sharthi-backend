import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

import {
  getOrganizerProfile,
  updateOrganizerProfile,
  broadcastMessage,
  exportRoster
} from '../controllers/organizerExtraController.js';

const r = express.Router();

r.get('/organizers/me', protect, getOrganizerProfile);
r.patch('/organizers/me/profile', protect, updateOrganizerProfile);

r.post('/organizers/me/events/:id/broadcast', protect, broadcastMessage);

r.get('/organizers/me/events/:eventId/roster', protect, exportRoster);

export default r;
