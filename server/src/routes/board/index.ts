import { Router } from 'express';
import addBoardRouter from './addBoard';
import getColumnsRouter from './getColumns';

const boardRouter = Router();

boardRouter.use('/', addBoardRouter);
boardRouter.use('/', getColumnsRouter);

export default boardRouter;
