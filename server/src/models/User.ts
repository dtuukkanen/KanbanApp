import mongoose, { Schema, Document} from "mongoose";

// Define the User interface
interface User extends Document {
    username: string;
    email: string;
    password: string;
    boards: mongoose.Types.ObjectId[];
}

// Define the User schema
const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    boards: {
        type: [mongoose.Types.ObjectId],
        ref: "Board",
        default: []
    }
});

// Create the User model
const UserModel = mongoose.model<User>('Users', UserSchema);

// Export the User model
export { User, UserModel };
