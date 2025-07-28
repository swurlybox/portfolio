import { InferSchemaType, model, Schema } from "mongoose";

// Implement email verification to prevent bot users.
const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    nickname: {type: String, required: true},
    email: {type: String, required: true}
}, {timestamps: true});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);