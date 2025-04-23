import mongoose, { Schema } from 'mongoose';



// Then use it in the leadership schema
const achievementSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sector:{
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true,
    },
    tenure: {
        type: String,
        required: true,
    },
    budget:{
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
    },
}, {
    timestamps: true
});

// Delete any existing model before creating a new one
if (mongoose.models.Achievement) {
    delete mongoose.models.Achievement;
}

const Achievement = mongoose.model('Achievement',
    achievementSchema
);

export default Achievement; 