import { Router } from 'express';
import { ColumnModel } from '../../models/Column';
import mongoose from 'mongoose';
import validateToken from '../../middleware/auth/validateToken';

const moveCardRouter = Router();

// Helper: arrayMove for arrays (works for Mongoose array of ObjectIDs)
const arrayMove = (array: any[], from: number, to: number) => {
  const newArray = [...array];
  const [movedItem] = newArray.splice(from, 1);
  newArray.splice(to, 0, movedItem);
  return newArray;
};

moveCardRouter.put('/:cardId', validateToken, async (req, res) => {
    try {
        const { cardId } = req.params;
        // Expect newColumnId, oldColumnId, and newIndex from the client
        const { newColumnId, oldColumnId, newIndex } = req.body;
        
        // Moving within the same column: reorder the card array
        if (newColumnId === oldColumnId) {
            const column = await ColumnModel.findById(newColumnId);
            if (!column) {
                return void res.status(404).json({ message: "Column not found" });
            }
            const oldIndex = column.cards.findIndex(id => id.toString() === cardId);
            if (oldIndex === -1) {
                return void res.status(404).json({ message: "Card not found in column" });
            }
            column.cards = arrayMove(column.cards, oldIndex, newIndex);
            await column.save();
            return void res.status(200).json({ message: "Card reordered successfully" });
        } else {
            // Moving from one column to another
            const newColumn = await ColumnModel.findById(newColumnId);
            const oldColumn = await ColumnModel.findById(oldColumnId);
            if (!newColumn) {
                return void res.status(404).json({ message: "New column not found" });
            } 
            if (!oldColumn) {
                return void res.status(404).json({ message: "Old column not found" });
            }
            // Remove the card from the old column
            const cardIndex = oldColumn.cards.findIndex(id => id.toString() === cardId);
            if (cardIndex === -1) {
                return void res.status(404).json({ message: "Card not found in old column" });
            }
            oldColumn.cards.splice(cardIndex, 1);
            await oldColumn.save();
            // Insert into new column at the desired index (or at the end if newIndex is out of bounds)
            const insertIndex = (typeof newIndex === 'number' && newIndex <= newColumn.cards.length)
              ? newIndex
              : newColumn.cards.length;
            newColumn.cards.splice(insertIndex, 0, new mongoose.Types.ObjectId(cardId));
            await newColumn.save();
            return void res.status(200).json({ message: "Card moved successfully" });
        }
    } catch (error: any) {
        console.error("Error moving card:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default moveCardRouter;