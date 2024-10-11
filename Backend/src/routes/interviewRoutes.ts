import express from 'express';
import {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
} from '../controllers/interview.controller';

const router = express.Router();

router.post('/', createInterview); // Create a new interview
router.get('/', getInterviews); // Get all interviews
router.get('/:id', getInterviewById); // Get interview by ID
router.put('/:id', updateInterview); // Update an interview
router.delete('/:id', deleteInterview); // Delete an interview

export default router;
