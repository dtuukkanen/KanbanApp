import { Request, Response, Router } from "express";
import { ColumnModel } from "../../models/Column";
import { CardModel } from "../../models/Card";
import validateToken from "../../middleware/auth/validateToken";

const deleteCardRouter = Router();

deleteCardRouter.delete("/:cardId", validateToken, async (req: Request, res: Response) => {
  try {
    // Extract cardId from parameters
    const { cardId } = req.params;
    // Extract columnId from the request body
    const { columnId } = req.body;

    // Find the column that the new card belongs to
    const column = await ColumnModel.findById(columnId);
    // Find the card
    const card = await CardModel.findById(cardId);

    // If the column is not found, return a 404 error
    if (!column) {
      return void res.status(404).json({ message: "Column not found" });
    }
    // If the card is not found, return a 404 error
    else if (!card) {
      return void res.status(404).json({ message: "Card not found" });
    }
    // If the card is not in the column, return a 404 error
    else {
      // Remove the card from the column's cards array
      column.cards = column.cards.filter((id) => id.toString() !== cardId);
      await column.save();

      // Delete the card from the database
      await card.deleteOne();
    }

    // Return a success message
    return void res.status(200).json({ message: "Card deleted" });
  } catch (error: any) {
    console.error("Error deleting card:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default deleteCardRouter;
