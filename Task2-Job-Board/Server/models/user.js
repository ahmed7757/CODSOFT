import { Schema as _Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';  // For hashing password

const Schema = _Schema;

// Profile schema (sub-document)
const profileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    resume: {
        type: String,
        required: function () { return this.role === 'candidate'; }  // Conditional requirement
    },
    profilePicture: {
        type: String,
        required: function () { return this.role === 'candidate'; }
    },
    companyName: {
        type: String,
        required: function () { return this.role === 'employer'; }
    },
    companyWebsite: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: 'Please enter a valid URL'
        },
        required: function () { return this.role === 'employer'; }
    }
});

// User schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['employer', 'candidate'],
        required: true
    },
    profile: profileSchema  // Embedding the profile sub-schema
}, {
    timestamps: true
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword, userPassword) {
    return await bcrypt.compare(enteredPassword, userPassword);
};

const User = model('User', userSchema);

export default User;
