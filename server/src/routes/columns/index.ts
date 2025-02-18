import { Router } from 'express';
import createColumnRouter from './createColumn';
import renameColumnRouter from './renameColumn';
import deleteColumnRouter from './deleteColumn';

const columnsRouter = Router();

columnsRouter.use('/', createColumnRouter);
columnsRouter.use('/', renameColumnRouter);
columnsRouter.use('/', deleteColumnRouter);

export default columnsRouter;
