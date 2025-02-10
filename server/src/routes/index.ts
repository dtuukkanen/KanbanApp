import { Request, Response, Router } from 'express';
import addCardRouter from './addCard';
import createColumnRouter from './createColumn';
import deleteColumnRouter from './deleteColumn';

// Create a new router to handle all the routes
const router = Router();

// Define the routes
router.use('/addCard', addCardRouter);
router.use('/createColumn', createColumnRouter);
router.use('/deleteColumn', deleteColumnRouter);

// Export the router
export default router;
