import { Router } from 'express';
import { UserModel } from '../../models/User';
import bcrypt from 'bcryptjs';

const registerUserRouter = Router();

registerUserRouter.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if email and password are provided
        if (!username) {
            return void res.status(400).json({ message: "Username is required" });
        } else if (!email) {
            return void res.status(400).json({ message: "Email is required" });
        } else if (!password) {
            return void res.status(400).json({ message: "Password is required" });
        }

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return void res.status(409).json({ message: "User already exists" });
        }

        // TODO: Validate email and password through express-validator

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        // Create a new user document
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user document
        await newUser.save();

        return void res.status(200).json({ message: "User registered" });
    } catch (error: any) {
        console.error("Error registering user:", error);
        return void res.status(500).json({ message: "Internal server error" });
    }
});

export default registerUserRouter;
