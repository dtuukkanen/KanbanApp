import { Router } from 'express';
import { KanbanCardModel } from '../models/KanbanCard';

const addCardRouter = Router();

addCardRouter.post('/', async (req, res) => {
    try {
        // Extract the title, description, color, tags, and version from the request body
        const { title, description, color, tags, version } = req.body;

        // Create a new KanbanCard document
        const newCard = new KanbanCardModel({ title, description, color, tags, version });

        // Save the new KanbanCard document
        await newCard.save();
        return void res.status(201).send(newCard);
    } catch (error: any) {
        console.error("Error saving kanban card:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default addCardRouter;