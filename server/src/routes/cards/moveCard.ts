import { Router } from 'express';
import { KanbanColumnModel } from '../../models/KanbanColumn';

const moveCardRouter = Router();

moveCardRouter.put('/', async (req, res) => {
    try {
        const { newColumnId, oldColumnId, cardId } = req.body;
    
        // Find new and old columns
        const newColumn = await KanbanColumnModel.findById(newColumnId);
        const oldColumn = await KanbanColumnModel.findById(oldColumnId);

        // Check if columns exist
        if (!newColumn) {
            return void res.status(404).json({ message: "New column not found" });
        } else if (!oldColumn) {
            return void res.status(404).json({ message: "Old column not found" });
        } else {
            // Add card to new column
            newColumn.cardIds.push(cardId);
            await newColumn.save();

            // Remove card from old column
            oldColumn.cardIds = oldColumn.cardIds.filter(id => id.toString() !== cardId);
            await oldColumn.save();

            // Return success message
            return void res.status(200).json({ message: "Card moved successfully" });
        }
    } catch (error: any) {
        console.error("Error moving column:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default moveCardRouter;