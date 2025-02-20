import { Router } from 'express';
import { ColumnModel } from '../../models/Column';
import mongoose from 'mongoose';
import validateToken from '../../middleware/auth/validateToken';

const moveCardRouter = Router();

moveCardRouter.put('/:cardId', validateToken, async (req, res) => {
    try {
        const { cardId } = req.params;
        const { newColumnId, oldColumnId } = req.body;
    
        // Find new and old columns
        const newColumn = await ColumnModel.findById(newColumnId);
        const oldColumn = await ColumnModel.findById(oldColumnId);

        // Check if columns exist
        if (!newColumn) {
            return void res.status(404).json({ message: "New column not found" });
        } else if (!oldColumn) {
            return void res.status(404).json({ message: "Old column not found" });
        } else {
            // Add card to new column
            newColumn.cards.push(new mongoose.Types.ObjectId(cardId));
            await newColumn.save();

            // Remove card from old column
            oldColumn.cards = oldColumn.cards.filter(id => id.toString() !== cardId);
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