import mongoose, { Schema, Document } from "mongoose";

// Define the Board interface
interface Board extends Document {
    title: string;
    columns: mongoose.Types.ObjectId[];
}

// Define the Board schema
const BoardSchema: Schema = new Schema({
    title: { type: String, required: true },
    columns: [{
        type: mongoose.Types.ObjectId,
        ref: "KanbanColumn",
        required: false
    }]
});

// Create the Board model
const BoardModel = mongoose.model<Board>('Board', BoardSchema);

// Export the Board model
export { Board, BoardModel };
