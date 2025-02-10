import mongoose, { Schema, Document } from "mongoose";

// Define the KanbanCard interface
interface KanbanCard extends Document {
    title: string;
    description: string;
    color: string;
    tags: string[];
    version: number;
}

// Define the KanbanCard schema
const KanbanCardSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    tags: { type: [String], required: true },
    version: { type: Number, required: true }
});

// Create the KanbanCard model
const KanbanCardModel = mongoose.model<KanbanCard>('KanbanCard', KanbanCardSchema);

// Export the KanbanCard model
export { KanbanCard, KanbanCardModel };
