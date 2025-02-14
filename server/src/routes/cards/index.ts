import { Router } from 'express';
import addCard from './addCard';
import moveCard from './moveCard';
import deleteCard from './deleteCard';

const cardsRouter = Router();

// POST /cards - Create a new card.
cardsRouter.post('/', addCard);

// PUT /cards/:cardId/move - Move a card (you can also use PUT /cards/:cardId if updating the card).
cardsRouter.put('/:cardId/move', moveCard);

// DELETE /cards/:cardId - Delete a card.
cardsRouter.delete('/:cardId', deleteCard);

export default cardsRouter;