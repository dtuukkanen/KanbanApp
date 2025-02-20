import { Router } from 'express';
import validateToken from '../../middleware/auth/validateToken';
import { UserModel } from '../../models/User';

const getUserBoardDataRouter = Router();

getUserBoardDataRouter.get('/', validateToken, async (req, res) => {
  try {
    // Get the user id from the validated token
    const userId = (req as any).token.id;

    // Find the user and populate boards, then columns, then cards for each column
    const userData = await UserModel.findOne({ _id: userId })
      .populate({
        path: 'boards',
        populate: [
          {
            path: 'columns',
            populate: {
              path: 'cards'
            }
          }
        ]
      })
      .exec();

    if (!userData) {
      return void res.status(404).json({ message: 'User or boards not found' });
    }

    // Return the populated user document including boards, columns, and cards.
    return void res.status(200).json(userData);
  } catch (error: any) {
    console.error("Error populating user board data:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default getUserBoardDataRouter;