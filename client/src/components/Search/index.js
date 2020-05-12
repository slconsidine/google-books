import React, { Component } from "react";
import API from "../../utils/API";
import { Input, FormBtn } from "../Form";
import {BookList, BookListItem} from "../BookList";
import SaveBook from "../SaveBook";
import NavBar from "../NavBar";

class Search extends Component {

    state = {
        books: [],
        bookSearch: "",
    }

    handleInputChange = event => {
        // const { name, value } = event.target;
        let value = event.target.value;
        let name = event.target.name;
        this.setState({
            [name]: value
        });
        console.log("booksearch: " + this.state.bookSearch);
        console.log("search " + this.state.search)
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("in handle form submit");
        // API call, goes through JSON results and logs them into searchResults array
        // push searchResults away via setState to books
        // reset the bookSearch state

        console.log(this.state.bookSearch);
        let searchResults = [];
        API.getBooks(this.state.bookSearch)
            .then(res => {
                for (var i=0; i<res.data.items.length; i++) {
                    searchResults.push(
                        { 
                            authors: res.data.items[i].volumeInfo.authors,
                            description: res.data.items[i].volumeInfo.description,
                            image: res.data.items[i].volumeInfo.imageLinks.thumbnail,
                            link: res.data.items[i].volumeInfo.infoLink,
                            title: res.data.items[i].volumeInfo.title
                        })
                };
            this.setState({ books: searchResults });
            // ** this should maybe be search: ""
            this.setState({ bookSearch: "" });
        }).catch(err => console.log(err));
        console.log(this.state.books);
    };


    saveBook = (bookToSave) => {
        // event.preventDefault();
        // console.log("book to save target: " + bookToSave.target);
        console.log("current books array " + this.state.books);
        // takes all books shown on page and puts them in new variable
        let allBooks = this.state.books;
        console.log("new books: " + allBooks);
        // grabs all the book being saved's info
        API.saveBook(bookToSave)
        .then(res => {
          // goes through all the books on the page and filters out all that are NOT the book you are trying to save
          let newBooks = allBooks.filter(book => book.id !== bookToSave.id);
          // sets the state of the books array as all EXCEPT the saved
          this.setState({ books: newBooks });
        })
        .catch(err => console.log(err));
      };
      
    render() {
        return(
            <div>
                <NavBar />
                <form onSubmit={this.handleFormSubmit}>
                    <Input
                        name="bookSearch"
                        handleInputChange={this.handleInputChange}
                        value={this.state.bookSearch}
                        placeholder="Book (required)"
                    />
                    <FormBtn
                        disabled={!(this.state.bookSearch)}
                    >
                        Submit Book Search
                    </FormBtn>
                </form>


            <div>                
                {this.state.books.length ? (
                    <BookList>

                        {this.state.books.map(book =>{
                        return(
                        <BookListItem key={book.title}>
                            <h2>{book.title}</h2>
                            <h3>Written By: {book.authors}</h3>
                            <p>{book.description}</p>
                            <a href={book.link}>Link to Google Books</a>
                            <img src={book.image} alt={book.title}></img>
                            <SaveBook onClick={() => this.saveBook(book)}/>
                            {/* <SaveBook data-book={JSON.stringify(book)} onClick={this.saveBook(this.data-book)}/> */}
                            </BookListItem>)}
                        )}  
                    </BookList>
                ) : (
                    <h1>Search for something</h1>
                    )
                    
            }</div>
            </div>
        )
    }
 };

 export default Search;

