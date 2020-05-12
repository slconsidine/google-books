const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    authors: { type: Array, required: true },
    description: { type: String, required: true },
    image: { type: String },
    link: { type: String, required: true },
    title: { type: String, required: true },
    // saved: { type: Boolean, required: true, default: false }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

  
