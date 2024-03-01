import { Schema, model, models } from "mongoose";

const AuthorSchema = new Schema({
    author_name: {
        type: String,
        required: true
    },
    author_pfp: {
        type: String,
        required: false
    }
    
}, {timestamps: true});


module.exports = model("Author", AuthorSchema);