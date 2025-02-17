import { Router } from "express";
import validateToken from "../../middleware/auth/validateToken";
import { UserModel } from "../../models/User";

const meRouter = Router();

meRouter.get("/", validateToken, async (req, res) => {
  try {
    // (req as any).token is set by validateToken
    const userId = (req as any).token.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return void res.status(404).json({ message: "User not found" });
    }
    return void res.status(200).json({ email: user.username });
  } catch (error) {
    console.error("Error fetching user:", error);
    return void res.status(500).json({ message: "Internal server error" });
  }
});

export default meRouter;
