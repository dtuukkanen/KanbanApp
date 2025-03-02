import mongoose, { Schema, Document } from "mongoose";

// Define the Card interface
interface Card extends Document {
  title: string;
  description: string;
  date: Date;
}

// Define the Card schema
const CardSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  date: { type: Date, required: true, default: Date.now },
});

// Create the Card model
const CardModel = mongoose.model<Card>("Card", CardSchema);

// Export the Card model
export { Card, CardModel };
