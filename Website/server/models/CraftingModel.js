const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CraftingSchema = new Schema({
    crafting_type: {
        type: String,
        required: true
    },
    crafting_grid: {
        type: Array,
        required: true
    },
    crafting_products: {
        type: Array,
        required: true
    }
    
}, {timestamps: true});


module.exports = mongoose.model("Crafting", CraftingSchema);