import { Router } from "express";
import { ColumnModel } from "../../models/Column";
import mongoose from "mongoose";
import validateToken from "../../middleware/auth/validateToken";
import { CardModel } from "../../models/Card";

const moveCardRouter = Router();

// Helper: arrayMove for arrays (works for Mongoose array of ObjectIDs)
const arrayMove = (array: any[], from: number, to: number) => {
  const newArray = [...array];
  const [movedItem] = newArray.splice(from, 1);
  newArray.splice(to, 0, movedItem);
  return newArray;
};

moveCardRouter.put("/:cardId", validateToken, async (req, res) => {
  try {
    // Extract cardId from the route parameter
    const { cardId } = req.params;

    // Extract required data from the request body
    const { newColumnId, oldColumnId, newIndex } = req.body;

    // CASE 1: Moving within the same column (reordering)
    if (newColumnId === oldColumnId) {
      // Find the column containing the card
      const column = await ColumnModel.findById(newColumnId);

      // Check if column exists
      if (!column) {
        return void res.status(404).json({ message: "Column not found" });
      }

      // Find the current position of the card in the column
      const oldIndex = column.cards.findIndex((id) => id.toString() === cardId);

      // Verify the card exists in the column
      if (oldIndex === -1) {
        return void res
          .status(404)
          .json({ message: "Card not found in column" });
      }

      // Reorder the cards array using the helper function
      column.cards = arrayMove(column.cards, oldIndex, newIndex);

      // Save the updated column
      await column.save();

      return void res
        .status(200)
        .json({ message: "Card reordered successfully" });
    }

    // CASE 2: Moving between different columns
    else {
      // Find both source and destination columns
      const newColumn = await ColumnModel.findById(newColumnId);
      const oldColumn = await ColumnModel.findById(oldColumnId);

      // Verify destination column exists
      if (!newColumn) {
        return void res.status(404).json({ message: "New column not found" });
      }

      // Verify source column exists
      if (!oldColumn) {
        return void res.status(404).json({ message: "Old column not found" });
      }

      // Find the card's position in the source column
      const cardIndex = oldColumn.cards.findIndex(
        (id) => id.toString() === cardId
      );

      // Verify the card exists in the source column
      if (cardIndex === -1) {
        return void res
          .status(404)
          .json({ message: "Card not found in old column" });
      }

      // Update the card's date when moving between columns
      await CardModel.findByIdAndUpdate(cardId, { date: new Date() });

      // Remove the card from the source column
      oldColumn.cards.splice(cardIndex, 1);
      await oldColumn.save();

      // Calculate the insertion index, handling edge cases
      const insertIndex =
        typeof newIndex === "number" && newIndex <= newColumn.cards.length
          ? newIndex
          : newColumn.cards.length;

      // Insert the card into the destination column at the specific position
      newColumn.cards.splice(
        insertIndex,
        0,
        new mongoose.Types.ObjectId(cardId)
      );

      // Save the updated destination column
      await newColumn.save();

      return void res.status(200).json({ message: "Card moved successfully" });
    }
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Error moving card:", error);

    // Return a generic error to the client
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default moveCardRouter;
