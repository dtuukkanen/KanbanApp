import { Router } from 'express';
import { KanbanCardModel } from '../../models/KanbanCard';
import { KanbanColumnModel } from '../../models/KanbanColumn';
import validateToken from '../../middleware/auth/validateToken';

const createColumnRouter = Router();

createColumnRouter.post('/', validateToken, async (req, res) => {
    try {
        // Extract the title, description, color, tags, and version from the request body
        const { title } = req.body;

        // Create a new KanbanCard document
        const newColumn = new KanbanColumnModel({ title });

        // Save the new KanbanCard document
        await newColumn.save();
        return void res.status(201).send(newColumn);
    } catch (error: any) {
        console.error("Error saving kanban card:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default createColumnRouter;