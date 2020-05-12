import React, { Component } from "react";
import API from "../../utils/API";
import {BookList, BookListItem} from "../BookList";
import DeleteBook from "../DeleteBook";
import NavBar from "../NavBar";


class Saved extends Component {
    state = {
        savedBooks: []
    }

    componentDidMount() {
        this.loadSaved()
    }

    loadSaved = () => {
        API.getSaved()
            .then(res =>
                this.setState({ savedBooks: res.data }))
            .catch(err => console.log(err));
    };

    deleteBook = (bookToDelete) => {
        let allSaved = this.state.savedBooks;
        API.deleteBook(bookToDelete)
        .then(res => {
          // goes through all the saved books on the page and filters out all that are NOT the book you are trying to delete
          let newSavedList = allSaved.filter(book => book.id !== bookToDelete.id);
          // sets the state of the books array as all EXCEPT the deleted
          this.setState({ savedBooks: newSavedList });
        })
        .catch(err => console.log(err));
      };

    render() {
        return(
            <div>
                <NavBar />
                 <div>                
                {this.state.savedBooks.length ? (
                    <BookList>

                        {this.state.books.map(book =>{
                        return(
                        <BookListItem key={book.title}>
                            <h2>{book.title}</h2>
                            <h3>Written By: {book.authors}</h3>
                            <p>{book.description}</p>
                            <a href={book.link}>Link to Google Books</a>
                            <img src={book.image} alt={book.title}></img>
                            <DeleteBook onClick={() => this.deleteBook(book)}/>
                            </BookListItem>)}
                        )}  
                    </BookList>
                ) : (
                    <h1>Save some books</h1>
                    )
                    
            }</div>
            </div>
        )
    }
}

export default Saved;