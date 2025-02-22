import mongoose, { Schema, Document } from "mongoose";

// Define the Card interface
interface Card extends Document {
  title: string;
  description: string;
  color: string;
  tags: string[];
  version: number;
}

// Define the Card schema
const CardSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  color: { type: String, required: false },
  tags: { type: [String], required: false },
  version: { type: Number, required: false },
});

// Create the Card model
const CardModel = mongoose.model<Card>("Card", CardSchema);

// Export the Card model
export { Card, CardModel };
