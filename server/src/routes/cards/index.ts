import { Router } from 'express';
import addCardRouter from './addCard';
import moveCardRouter from './moveCard';
import deleteCardRouter from './deleteCard';

const cardsRouter = Router();

cardsRouter.use('/', addCardRouter);
cardsRouter.use('/', moveCardRouter);
cardsRouter.use('/', deleteCardRouter);

export default cardsRouter;
