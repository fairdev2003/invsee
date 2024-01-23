const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    item_name: {
        type: String,
        required: true
    },
    tag_name: {
        type: String,
        required: true
    },
    item_image: {
        type: String,
        required: true
    },
    crafting_recipes: {
        type: Array,
        required: false
    },
    wiki_elements: {
        type: Array,
        required: false
    },
    mod_tag: {
        type: String,
        required: true
    }
    
}, {timestamps: true});


module.exports = mongoose.model("Items", ItemSchema);