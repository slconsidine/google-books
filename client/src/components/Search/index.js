import React, { Component } from "react";
import API from "../../utils/API";
import { Input, FormBtn } from "../Form";

class Search extends Component {

    state = {
        books: [],
        bookSearch: "",
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSumbit = event => {
        event.preventDefault();
        // API call, goes through JSON results and logs them into searchResults array
        // push searchResults away via setState to books
        // reset the bookSearch state
        API.getBooks(this.state.search)
            .then(res => {
                let searchResults = [];
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
            this.setState({ bookSearch: "" });
        }).catch(err => console.log(err));
    };

    render() {
        return(
            <div>
                <form>
                    <Input
                        value={this.state.search}
                        onChange={this.handleInputChange}
                        name="search"
                        placeholder="Book (required)"
                    />
                    <FormBtn
                        disabled={!(this.state.search)}
                        onClick={this.handleFormSubmit}
                    >
                        Submit Book Search
                    </FormBtn>
                </form>
            </div>
        )
    }
      
 };

 export default Search;

