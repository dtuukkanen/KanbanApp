import { Router } from "express";
import loginUserRouter from "./loginUser";
import registerUserRouter from "./registerUser";
import meRouter from "./me";

// Create a new router instance for authenticaton routes
const authRouter = Router();

// Mount the login route at /login
authRouter.use("/login", loginUserRouter);

// Mount the register route at /register
authRouter.use("/register", registerUserRouter);

// Mount the me route at /me
authRouter.use("/me", meRouter);

// Export the authRouter to be used in other parts of the application
export default authRouter;
