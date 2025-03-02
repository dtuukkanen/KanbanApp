import { Router } from "express";
import validateToken from "../../middleware/auth/validateToken";
import { UserModel } from "../../models/User";

const meRouter = Router();

meRouter.get("/", validateToken, async (req, res) => {
  try {
    // (req as any).token is set by validateToken
    const userId = (req as any).token.id;

    // Find the user by ID
    const user = await UserModel.findById(userId);

    // If user not found, return 404
    if (!user) {
      return void res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    return void res.status(200).json({ id: user._id, username: user.username });
  } catch (error) {
    console.error("Error fetching user:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default meRouter;
