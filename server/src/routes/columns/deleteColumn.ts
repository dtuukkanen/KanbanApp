import { Router } from "express";
import { CardModel } from "../../models/Card";
import { ColumnModel } from "../../models/Column";
import validateToken from "../../middleware/auth/validateToken";

const deleteColumnRouter = Router();

deleteColumnRouter.delete("/:columnId", validateToken, async (req, res) => {
  try {
    const { columnId } = req.params;

    const column = await ColumnModel.findById(columnId);
    if (!column) {
      return void res.status(404).json({ message: "Column not found" });
    } else {
      await CardModel.deleteMany({ _id: { $in: column.cards } });
      await column.deleteOne();
      return void res.status(200).json({ message: "Column deleted" });
    }
  } catch (error: any) {
    console.error("Error deleting column:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default deleteColumnRouter;
