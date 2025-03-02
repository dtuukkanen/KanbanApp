import { Router } from "express";
import { ColumnModel } from "../../models/Column";
import validateToken from "../../middleware/auth/validateToken";

// Create a new router instance for renaming a column
const renameColumnRouter = Router();

// Define the route for renaming a column
renameColumnRouter.patch("/:columnId", validateToken, async (req, res) => {
  try {
    // Extract columnId from the parameters
    const { columnId } = req.params;
    // Extract newTitle from the request body
    const { newTitle } = req.body;

    // Find the column by ID
    const column = await ColumnModel.findById(columnId);

    // If the column does not exist, return a 404 error
    if (!column) {
      return void res.status(404).json({ message: "Column not found" });
    } else {
      // Update the column title and save the changes
      column.title = newTitle;
      await column.save();

      // Return a success message
      return void res
        .status(200)
        .json({ message: "Column renamed successfully" });
    }
  } catch (error: any) {
    console.error("Error deleting column:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default renameColumnRouter;
