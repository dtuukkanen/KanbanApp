import { Router } from 'express';
import { KanbanColumnModel } from '../../models/KanbanColumn';
import { KanbanCardModel } from '../../models/KanbanCard';
import mongoose from 'mongoose';

const addCardRouter = Router();

addCardRouter.post('/', async (req, res) => {
    try {
        // Extract the title, description, color, tags, and version from the request body
        const { title, description, color, tags, version, columnId } = req.body;

        // Create a new KanbanCard document
        const newCard = new KanbanCardModel({ title, description, color, tags, version });

        // Find the column that the new card belongs to
        const column = await KanbanColumnModel.findById(columnId);
        if (!column) {
            return void res.status(404).json({ message: "Column not found" });
        } else {
            // Add the new card to the column
            column.cardIds.push(newCard._id as mongoose.Types.ObjectId);
            await column.save();
        }

        // Save the new KanbanCard document
        await newCard.save();
        return void res.status(201).send(newCard);
    } catch (error: any) {
        console.error("Error saving kanban card:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default addCardRouter;