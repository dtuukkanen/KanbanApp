import express, { Express, Request, Response } from 'express';
import router from './routes';
import mongoose, { Connection } from 'mongoose';
import morgan from 'morgan';

// Create a new express app
const app: Express = express();
const port = 3000;

// Connect to the database
const mongoUrl = 'mongodb://localhost:27017/kanban';
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;
const db: Connection = mongoose.connection;
// Log an error if we fail to connect
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Use morgan to log all requests
app.use(morgan('dev'));

// Use the router to handle all requests
app.use("/api", router);

// Start Express
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
