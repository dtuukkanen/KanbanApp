import { Router } from 'express';
import { ColumnModel } from '../../models/Column';
import validateToken from '../../middleware/auth/validateToken';

const renameColumnRouter = Router();

renameColumnRouter.put('/:columnId', validateToken, async (req, res) => {
    try {
        const { columnId } = req.params;
        const { newTitle } = req.body;
    
        const column = await ColumnModel.findById(columnId);
        if (!column) {
            return void res.status(404).json({ message: "Column not found" });
        } else {
            column.title = newTitle;
            await column.save();
            return void res.status(200).json({ message: "Column renamed successfully" });
        }
    } catch (error: any) {
        console.error("Error deleting column:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default renameColumnRouter;