import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },

    profile: {
        type: String,
        default: ""
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    bannedPeriod: {
        type: Number,
        default: 1
    },
    uploadedCount: {
        type: Number,
        default: 0
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;