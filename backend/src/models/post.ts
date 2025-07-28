import { InferSchemaType, model, Schema } from "mongoose"

const postSchema = new Schema({
    poster: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true},
    imageFilePath: { type: String},
}, { timestamps : true });

// Makes the postSchema available to TypeScript as the type of an object.
type Post = InferSchemaType<typeof postSchema>;
// Result: type Post = {poster, title, description, ...}

// Compiles the schema so it appears in the database as a table.
// Exporting the compiled model (like a table) for instantiating instances (entities).
export default model<Post>("Post", postSchema);