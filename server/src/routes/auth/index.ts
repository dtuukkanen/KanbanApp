import { Router } from 'express';
import loginUserRouter from './loginUser';
import registerUserRouter from './registerUser';
import meRouter from './me';

const authRouter = Router();

// POST /columns - Create a new column.
authRouter.use('/login', loginUserRouter);
authRouter.use('/register', registerUserRouter);
authRouter.use('/me', meRouter);

export default authRouter;
