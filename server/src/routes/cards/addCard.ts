import { Router } from 'express';
import { ColumnModel } from '../../models/Column';
import { CardModel } from '../../models/Card';
import mongoose from 'mongoose';
import validateToken from '../../middleware/auth/validateToken';

const addCardRouter = Router();

addCardRouter.post('/:columnId', validateToken, async (req, res) => {
    try {
        // Extract the title, description, color, tags, and version from the request body
        const { columnId } = req.params;
        const { title, description, color, tags, version} = req.body;

        // Create a new Card document
        const newCard = new CardModel({ title, description, color, tags, version });

        // Find the column that the new card belongs to
        const column = await ColumnModel.findById(columnId);
        if (!column) {
            return void res.status(404).json({ message: "Column not found" });
        } else {
            // Add the new card to the column
            column.cards.push(newCard._id as mongoose.Types.ObjectId);
            await column.save();

            // Save the new Card document
            await newCard.save();
        }

        return void res.status(201).send(newCard);
    } catch (error: any) {
        console.error("Error saving card:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default addCardRouter;