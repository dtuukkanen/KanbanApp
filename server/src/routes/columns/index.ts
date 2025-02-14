import { Router } from 'express';
import createColumn from './createColumn';
import deleteColumn from './deleteColumn';
import renameColumn from './renameColumn';

const columnsRouter = Router();

// POST /columns - Create a new column.
columnsRouter.post('/', createColumn);

// PUT /columns/:columnId - Rename or update a column.
columnsRouter.put('/:columnId', renameColumn);

// DELETE /columns/:columnId - Delete a column.
columnsRouter.delete('/:columnId', deleteColumn);

export default columnsRouter;