import mongoose, { Schema, Document } from "mongoose";

// Define the Column interface
interface Column extends Document {
  title: string;
  cards: mongoose.Types.ObjectId[];
}

// Define the Column schema
const ColumnSchema: Schema = new Schema({
  title: { type: String, required: true },
  cards: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Card",
      default: [],
    },
  ],
});

// Create the Column model
const ColumnModel = mongoose.model<Column>("Column", ColumnSchema);

// Export the Column model
export { Column, ColumnModel };
