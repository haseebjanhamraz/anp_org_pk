import mongoose from 'mongoose';
import { CabinetType } from '@/app/types/Cabinets';

// Define Document Schema
const CabinetSchema = new mongoose.Schema<CabinetType>({
    cabinetType: {
        type: String,
        required: true,
        unique: true // This ensures uniqueness
    },


}, {
    timestamps: true
});

// Get or create model
export const Cabinet = mongoose.models.Cabinet || mongoose.model('Cabinet', CabinetSchema);
