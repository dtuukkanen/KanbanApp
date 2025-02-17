import mongoose, { Schema, Document } from "mongoose";

// Define the KanbanColumn interface
interface KanbanColumn extends Document {
    title: string;
    cardIds: mongoose.Types.ObjectId[];
}

// Define the KanbanColumn schema
const KanbanColumnSchema: Schema = new Schema({
    title: { type: String, required: true },
    cardIds: [{
        type: mongoose.Types.ObjectId,
        ref: "KanbanCard",
        default: []
    }]
});

// Create the KanbanColumn model
const KanbanColumnModel = mongoose.model<KanbanColumn>('KanbanColumn', KanbanColumnSchema);

// Export the KanbanColumn model
export { KanbanColumn, KanbanColumnModel };
