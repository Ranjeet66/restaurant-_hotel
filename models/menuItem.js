const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({

    name: { type: String, require: true },
    price: { type: Number, require: true },
    taste: { type: String, enum: ['sweet', 'spicy', 'sour'], require: true },
    drink: { type: Boolean, default: false },
    ingredients: { type: [String], default: [] },
    sales: { type: Number, default: 0 },

});

const menuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = menuItem;
