import { Request, Response, Router } from 'express';
import addCardRouter from './add_card';

// Create a new router to handle all the routes
const router = Router();

// Define the routes
router.use('/add_card', addCardRouter);

// Export the router
export default router;
