import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    minlength: [3, 'Job title must be at least 3 characters long'],
    maxlength: [100, 'Job title must be less than 100 characters'],
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    minlength: [3, 'Company name must be at least 3 characters long'],
    maxlength: [100, 'Company name must be less than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true,
    minlength: [10, 'Job description must be at least 10 characters long'],
  },
  requirements: [
    {
      type: String,
      required: [true, 'Each job requirement must be specified'],
      minlength: [2, 'Each requirement must be at least 2 characters long'],
    }
  ],
  employer: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the Employer (User model)
    required: [true, 'Employer is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    minlength: [2, 'Location must be at least 2 characters long'],
  },
  salaryRange: {
    type: Number,
    required: [true, 'Salary range is required'],
    min: [0, 'Salary must be greater than 0'],
    max: [1000000, 'Salary must be less than 1,000,000'],
  },
  jobType: {
    type: String,
    enum: {
      values: ['full-time', 'part-time', 'contract', 'remote', 'internship'],
      message: '{VALUE} is not a valid job type',
    },
    required: [true, 'Job type is required'],
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: {
      values: ['open', 'closed'],
      message: '{VALUE} is not a valid status',
    },
    default: 'open',
  }
});

const Job = model('Job', jobSchema);

export default Job;
