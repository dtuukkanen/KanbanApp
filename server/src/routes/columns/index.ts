import { Router } from 'express';
import createColumnRouter from './createColumn';
import renameColumnRouter from './renameColumn';
import deleteColumnRouter from './deleteColumn';
import getCardsRouter from './getCards';

const columnsRouter = Router();

columnsRouter.use('/', createColumnRouter);
columnsRouter.use('/', renameColumnRouter);
columnsRouter.use('/', deleteColumnRouter);
columnsRouter.use('/', getCardsRouter);

export default columnsRouter;
