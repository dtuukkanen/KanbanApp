import { Router } from "express";
import { UserModel } from "../../models/User";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const loginUserRouter = Router();

loginUserRouter.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email) {
            return void res.status(400).json({ message: "Email is required" });
        } else if (!password) {
            return void res.status(400).json({ message: "Password is required" });
        }

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return void res.status(404).json({ message: "User not found" });
        }

        // Check if password is correct
        if (bcrypt.compareSync(password, user.password)) {
            const jwtPayload: JwtPayload = {
                id: user._id,
                username: user.username,
                email: user.email
            };

            // Create a token
            const token: string = jwt.sign(
                jwtPayload,
                process.env.JWT_SECRET as string,
                { expiresIn: "5m" }
            );

            // Return the token
            return void res.status(200).json({ token }); 
        }
        // If the password is incorrect,
        return void res.status(401).json({ message: "Invalid credentials" });
    } catch (error: any) {
        console.error("Error logging in user:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default loginUserRouter;
