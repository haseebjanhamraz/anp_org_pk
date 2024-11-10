import mongoose, { Schema } from 'mongoose';
import { Cabinet } from './Cabinet';

// First, create the social media schema
const socialMediaSchema = new Schema({
    platform: {
        type: String,
        enum: ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'other'],
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { _id: false }); // _id: false is important here



// Then use it in the leadership schema
const leadershipSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    cabinet: {
        type: Schema.Types.ObjectId,
        ref: 'Cabinet',
        required: true
    },
    period: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    socialMedia: {
        type: [socialMediaSchema],
        default: []
    }
}, {
    timestamps: true
});

// Delete any existing model before creating a new one
if (mongoose.models.Leadership) {
    delete mongoose.models.Leadership;
}

const Leadership = mongoose.model('Leadership',
    leadershipSchema
);

export default Leadership; 