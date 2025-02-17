import { Router } from 'express';
import loginUserRouter from './loginUser';
import registerUserRouter from './registerUser';
import meRouter from './me';
import getBoardsRouter from './getBoards';

const authRouter = Router();

// POST /columns - Create a new column.
authRouter.use('/login', loginUserRouter);
authRouter.use('/register', registerUserRouter);
authRouter.use('/me', meRouter);
authRouter.use('/getBoards', getBoardsRouter);

export default authRouter;
