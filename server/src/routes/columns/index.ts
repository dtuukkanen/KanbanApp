import { Router } from 'express';
import createColumnRouter from './createColumn';
import renameColumnRouter from './renameColumn';
import deleteColumnRouter from './deleteColumn';

const columnsRouter = Router();

// POST /columns - Create a new column.
columnsRouter.post('/', createColumnRouter);

// PUT /columns/:columnId - Rename or update a column.
columnsRouter.put('/:columnId', renameColumnRouter);

// DELETE /columns/:columnId - Delete a column.
columnsRouter.delete('/:columnId', deleteColumnRouter);

export default columnsRouter;
