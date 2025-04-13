import mongoose, { Document as MongoDocument } from 'mongoose';

// Define Document interface
export interface IDocument extends MongoDocument {
    name: string;
    publishYear: number;
    lastModifiedYear?: number;
    category: string;
    language: string;
    filepath: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define Document Schema
const DocumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    publishYear: { type: Number, required: true },
    lastModifiedYear: { type: Number },
    category: { type: String, required: true },
    language: { type: String, required: true },
    filepath: { type: String, required: true }
}, {
    timestamps: true
});

// Get or create model
export const Document = (mongoose.models.Document as mongoose.Model<IDocument>) || 
    mongoose.model<IDocument>('Document', DocumentSchema);