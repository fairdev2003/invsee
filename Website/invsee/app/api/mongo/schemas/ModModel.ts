import { Schema, model, models } from "mongoose";

const ModSchema = new Schema({
    
    mod_owner: {
        type: String,
        required: true
    },
    mod_authors : {
        type: [String],
        required: true
    },
    mod_loaders: {
        type: [String],
        required: true
    },
    mod_name: {
        type: String,
        required: true
    },
    mod_description: {
        type: String,
        required: false
    },
    mod_tag: {
        type: String,
        required: true
    },
    mod_image: {
        type: String,
        required: false
    },
    release_data: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true 
    },
    level_of_complexity: {
        type: Number,
        min: 1,
        max: 4
    }

    
}, {timestamps: true});


module.exports = model("Mod", ModSchema);
