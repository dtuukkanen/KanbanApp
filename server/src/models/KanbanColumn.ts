import mongoose, { Schema, Document } from "mongoose";

// Define the KanbanColumn interface
interface KanbanColumn extends Document {
    title: string;
    cardIds: string[];
}

// Define the KanbanColumn schema
const KanbanColumnSchema: Schema = new Schema({
    title: { type: String, required: true },
    cardIds: { type: [String], required: true }
});

// Create the KanbanColumn model
const KanbanColumnModel = mongoose.model<KanbanColumn>('KanbanColumn', KanbanColumnSchema);

// Export the KanbanColumn model
export { KanbanColumn, KanbanColumnModel };
