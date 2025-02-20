import { Router } from 'express';
import addCardRouter from './addCard';
import moveCardRouter from './moveCard';
import deleteCardRouter from './deleteCard';

const cardsRouter = Router();

// POST /cards - Create a new card.
cardsRouter.use('/', addCardRouter);

// PUT /cards/:cardId/move - Move a card (you can also use PUT /cards/:cardId if updating the card).
cardsRouter.use('/:cardId/move', moveCardRouter);

// DELETE /cards/:cardId - Delete a card.
cardsRouter.use('/:cardId', deleteCardRouter);


export default cardsRouter;
