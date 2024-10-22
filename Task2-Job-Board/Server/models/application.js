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
            validator: function (v) {
                // Adjust to accept valid local file paths in the 'uploads/' directory
                return /^uploads\/.+\.[a-zA-Z0-9]+$/.test(v);  // Validate file paths, e.g., 'uploads/filename.pdf'
            },
            message: 'Please provide a valid resume file path'
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
}, {
    timestamps: true
});

const Application = model('Application', applicationSchema);

export default Application;
