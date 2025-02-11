import { Router } from 'express';
import { KanbanColumnModel } from '../../models/KanbanColumn';

const renameColumnRouter = Router();

renameColumnRouter.put('/', async (req, res) => {
    try {
        const { columnId, newTitle } = req.body;
    
        const column = await KanbanColumnModel.findById(columnId);
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