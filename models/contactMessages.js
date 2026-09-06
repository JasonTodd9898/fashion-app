import mongoose from "mongoose";

const contactMessagesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    sentTime: {
        type: Date,
        default: Date.now
    }
})

const ContactMessages = mongoose.models.ContactMessages || mongoose.model('ContactMessages', contactMessagesSchema);

export default ContactMessages;