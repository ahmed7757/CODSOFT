import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    requirements:[
        {
            type: String,
            required: true
        }
    ],
    employer: {
        type: Schema.Types.ObjectId,  // Reference to the Employer (User model)
        ref: 'User',  // Employers are stored in the User schema
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salaryRange: {
        type: String,
        required: true,
        min:[0, 'Salary must be greater than 0'],  // Example validation
        max:[1000000, 'Salary must be less than 1,000,000']  // Example validation
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'remote', 'internship'],  // Example job types
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    }
});

const Job = model('Job', jobSchema);

export default Job;
