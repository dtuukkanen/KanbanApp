import mongoose, { Schema, Document} from "mongoose";

// Define the User interface
interface User extends Document {
    email: string;
    password: string;
    board: mongoose.Types.ObjectId;
}

// Define the User schema
const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    board: {
        type: mongoose.Types.ObjectId,
        ref: "Board",
        required: false
    }
});

// Create the User model
const UserModel = mongoose.model<User>('User', UserSchema);

// Export the User model
export { User, UserModel };
