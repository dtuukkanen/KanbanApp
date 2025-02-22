import { Router } from "express";
import { ColumnModel } from "../../models/Column";
import { CardModel } from "../../models/Card";
import validateToken from "../../middleware/auth/validateToken";

const deleteCardRouter = Router();

deleteCardRouter.delete("/:cardId", validateToken, async (req, res) => {
  try {
    const { cardId } = req.params;
    const { columnId } = req.body;

    // Find the column that the new card belongs to
    const column = await ColumnModel.findById(columnId);
    // Find the card
    const card = await CardModel.findById(cardId);

    if (!column) {
      return void res.status(404).json({ message: "Column not found" });
    } else if (!card) {
      return void res.status(404).json({ message: "Card not found" });
    } else {
      // Add the remove card to the column
      column.cards = column.cards.filter((id) => id.toString() !== cardId);
      await column.save();

      // Delete the card
      await card.deleteOne();
    }

    return void res.status(200).json({ message: "Card deleted" });
  } catch (error: any) {
    console.error("Error deleting card:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default deleteCardRouter;
