import axios from "axios";

export default {
  // Gets all books
  getBooks: function(bookSearch) {
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + bookSearch + "&key=AIzaSyD7swwbHmW0niver-5oB2VcqjOroJxeEcQ"
    return axios.get("url");
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books/", 
    {
        "authors": bookData.authors,
        "description": bookData.description,
        "image": bookData.image,
        "link": bookData.link,
        "title": bookData.title
    });
  },
  getSaved: function() {
      return axios.get("/api/books/")
  }
};
