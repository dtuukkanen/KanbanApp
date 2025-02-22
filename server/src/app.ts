import express, { Express, Request, Response } from "express";
import mongoose, { Connection } from "mongoose";
import router from "./routes";
import morgan from "morgan";
import dotenv from "dotenv";

// Import the environment variables
dotenv.config();

// Create a new express app
const app: Express = express();
const PORT = 3000;

// Parse JSON bodies
app.use(express.json());

// Connect to the database
const mongoUrl = "mongodb://localhost:27017/kanban";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;
// Log an error if we fail to connect
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Use morgan to log all requests
app.use(morgan("dev"));

// Use the router to handle all requests
app.use("/api", router);

// Start Express
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
