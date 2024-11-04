import mongoose from 'mongoose';

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
export const Document = mongoose.models.Document || mongoose.model('Document', DocumentSchema);