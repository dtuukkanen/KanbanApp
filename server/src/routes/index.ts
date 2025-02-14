import { Router } from 'express';
import columnsRouter from './columns';
import cardsRouter from './cards';

// Create a new router to handle all the routes
const router = Router();

// Define the routes
router.use('/columns', columnsRouter);
router.use('/cards', cardsRouter);

// Export the router
export default router;
