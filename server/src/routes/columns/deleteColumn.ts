import { Request, Response, Router } from "express";
import { CardModel } from "../../models/Card";
import { ColumnModel } from "../../models/Column";
import validateToken from "../../middleware/auth/validateToken";

const deleteColumnRouter = Router();

deleteColumnRouter.delete("/:columnId", validateToken, async (req: Request, res: Response) => {
  try {
    // Extract columnId from the parameter
    const { columnId } = req.params;

    // Find the column by its ID
    const column = await ColumnModel.findById(columnId);

    // If the column is not found, return a 404 error
    if (!column) {
      return void res.status(404).json({ message: "Column not found" });
    } else {
      // Delete all cards in the column
      await CardModel.deleteMany({ _id: { $in: column.cards } });
      // Delete the column itself
      await column.deleteOne();
      // Return a success message
      return void res.status(200).json({ message: "Column deleted" });
    }
  } catch (error: any) {
    console.error("Error deleting column:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default deleteColumnRouter;
