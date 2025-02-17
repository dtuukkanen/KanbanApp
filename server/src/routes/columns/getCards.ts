import { Router } from "express";
import validateToken from "../../middleware/auth/validateToken";
import { KanbanColumnModel } from "../../models/KanbanColumn";

const getCardsRouter = Router();

getCardsRouter.get("/:columnId", validateToken, async (req, res) => {
  try {
    const { columnId } = req.params;

    // Get column by ID
    const column = await KanbanColumnModel.findById(columnId);
    if (!column) {
      return void res.status(404).json({ message: "Column not found" });
    }

    // Return column details
    return void res.status(200).json({ title: column.title, cardIds: column.cardIds });
  } catch (error: any) {
    console.error("Error getting kanban cards:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default getCardsRouter;
