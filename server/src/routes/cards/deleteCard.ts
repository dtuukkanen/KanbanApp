import { Router } from 'express';
import { KanbanColumnModel } from '../../models/KanbanColumn';
import { KanbanCardModel } from '../../models/KanbanCard';

const deleteCardRouter = Router();

deleteCardRouter.delete('/:columnId', async (req, res) => {
    try {
        const columnId = req.params.columnId;
        const cardId = req.body;

        // Find the column that the new card belongs to
        const column = await KanbanColumnModel.findById(columnId);
        // Find the card
        const card = await KanbanCardModel.findById(cardId);

        if (!column) {
            return void res.status(404).json({ message: "Column not found" });
        } else if (!card) {
            return void res.status(404).json({ message: "Card not found" });
        } else {
            // Add the remove card to the column
            column.cardIds = column.cardIds.filter((id) => id.toString() !== cardId);
            await column.save();

            // Delete the card
            await card.deleteOne();
        }

        return void res.status(200).json({ message: "Card deleted" });
    } catch (error: any) {
        console.error("Error deleting kanban card:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default deleteCardRouter;