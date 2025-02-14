import { Router } from 'express';
import columnsRouter from './columns';
import cardsRouter from './cards';
import authRouter from './auth';

// Create a new router to handle all the routes
const router = Router();

// Define the routes
router.use('/columns', columnsRouter);
router.use('/cards', cardsRouter);
router.use('/auth', authRouter);

// Export the router
export default router;
