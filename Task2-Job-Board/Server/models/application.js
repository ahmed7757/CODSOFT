import { Schema, model } from 'mongoose';

const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicantId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resumeLink: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/[^ "]+$/.test(v);  // URL validation
            },
            message: 'Please provide a valid resume URL'
        }
    },
    coverLetter: {
        type: String,  // Optional field for cover letter
        required: false
    },
    status: {
        type: String,
        enum: ['applied', 'under review', 'accepted', 'rejected', 'withdrawn'],
        default: 'applied'
    },
    statusUpdatedAt: {
        type: Date,
        default: Date.now  // Tracks when the status was last updated
    }
}, {
    timestamps: true
});

const Application = model('Application', applicationSchema);

export default Application;
