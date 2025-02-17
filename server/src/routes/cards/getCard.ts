import { Router } from 'express';
import validateToken from '../../middleware/auth/validateToken';
import { KanbanCardModel } from '../../models/KanbanCard';

const getCardsRouter = Router();

getCardsRouter.get('/:cardId', validateToken, async (req, res) => {
    try {
        const { cardId } = req.params;

        // Get card by ID
        const card = await KanbanCardModel.findById(cardId);
        if (!card) {
            return void res.status(404).json({ message: "Card not found" });
        }

        // Return card
        return void res.status(200).send(card);
    } catch (error: any) {
        console.error("Error getting kanban cards:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default getCardsRouter;
