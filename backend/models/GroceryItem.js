const mongoose = require('mongoose');

const groceryItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    category: {
        type: String,
        required: true,
        default: 'Uncategorized'
    },
    isPurchased: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('GroceryItem', groceryItemSchema);
