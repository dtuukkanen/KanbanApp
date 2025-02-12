import { Router } from 'express';
import addCardRouter from './cards/addCard';
import createColumnRouter from './columns/createColumn';
import deleteColumnRouter from './columns/deleteColumn';
import renameColumnRouter from './columns/renameColumn';
import moveCardRouter from './cards/moveCard';
import deleteCardRouter from './cards/deleteCard';

// Create a new router to handle all the routes
const router = Router();

// Define the routes
router.use('/createColumn', createColumnRouter);
router.use('/deleteColumn', deleteColumnRouter);
router.use('/renameColumn', renameColumnRouter);
router.use('/addCard', addCardRouter);
router.use('/moveCard', moveCardRouter);
router.use('/deleteCard', deleteCardRouter);

// Export the router
export default router;
