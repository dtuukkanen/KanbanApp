import { Router } from 'express';
import { KanbanCardModel } from '../../models/KanbanCard';
import { KanbanColumnModel } from '../../models/KanbanColumn';

const createColumnRouter = Router();

createColumnRouter.delete('/', async (req, res) => {
    try {
        const { columnId } = req.body;
    
        const column = await KanbanColumnModel.findById(columnId);
        if (!column) {
            return void res.status(404).json({ message: "Column not found" });
        } else {
            await KanbanCardModel.deleteMany({ _id: { $in: column.cardIds } });
            await column.deleteOne();
            return void res.status(200).json({ message: "Column deleted" });
        }
    } catch (error: any) {
        console.error("Error deleting column:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default createColumnRouter;