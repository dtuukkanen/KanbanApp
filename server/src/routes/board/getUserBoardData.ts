import { Router } from 'express';
import mongoose from 'mongoose';
import validateToken from '../../middleware/auth/validateToken';
import { UserModel } from '../../models/User';

const getUserBoardDataRouter = Router();

getUserBoardDataRouter.get('/', validateToken, async (req, res) => {
  try {
    // Get the user id from the validated token
    const userId = (req as any).token.id;

    // Aggregate starting from the User document
    const aggregatedData = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(String(userId)) } },
      {
        $lookup: {
          from: 'boards',
          localField: 'boards',
          foreignField: '_id',
          as: 'boards'
        }
      },
      {
        $unwind: '$boards'
      },
      {
        $lookup: {
          from: 'kanbancolumns',
          localField: 'boards.columns',
          foreignField: '_id',
          as: 'boards.columns'
        }
      },
      {
        $group: {
          _id: '$_id',
          username: { $first: '$username' },
          boards: { $push: '$boards' }
        }
      }
    ]);

    if (!aggregatedData || aggregatedData.length === 0) {
      return void res.status(404).json({ message: 'User or boards not found' });
    }

    // Return the first (and only) user document with boards
    return void res.status(200).json(aggregatedData[0]);
  } catch (error: any) {
    console.error("Error aggregating user board data:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default getUserBoardDataRouter;
