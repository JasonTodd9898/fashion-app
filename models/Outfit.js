const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema(
    {
        photo:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
            min: [0, 'Price cannot be negative']
        },
        type:{
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        brand: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        sizeChart: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },
        color:{
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        rating:{
            average: { type: Number, default: 0, min: 0, max: 5 },
            count: { type: Number, default: 0 },
        }

    },
    {timestamps: true}
);

module.exports = mongoose.models.Outfit || mongoose.model('Outfit', outfitSchema);