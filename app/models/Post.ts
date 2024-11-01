import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
    message: string;
    created_time: Date;
}

const PostSchema = new Schema<IPost>({
    message: { type: String, required: true },
    created_time: { type: Date, required: true },
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
