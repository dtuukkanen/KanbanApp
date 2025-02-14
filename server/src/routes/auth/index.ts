import { Router } from 'express';
import loginUserRouter from './loginUser';
import registerUserRouter from './registerUser';

const authRouter = Router();

// POST /columns - Create a new column.
authRouter.use('/login', loginUserRouter);
authRouter.use('/register', registerUserRouter);

export default authRouter;
