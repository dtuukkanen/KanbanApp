import { Router } from 'express';
import validateToken from '../../middleware/auth/validateToken';

import { UserModel } from '../../models/User';

const addBoardRouter = Router();

addBoardRouter.get('/:userId', validateToken, async (req, res) => {
    try {
        // Extract the title from the request body
        const { userId } = req.params;

        // Find the user that owns the boards
        const user = await UserModel.findById(userId);
        if (!user) {
            return void res.status(404).json({ message: "User not found" });
        }

        // Return the new board
        return void res.status(201).send(user.boards);
    } catch (error: any) {
        console.error("Error getting boards:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default addBoardRouter;