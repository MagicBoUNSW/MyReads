import React,{Component} from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from "react-router-dom";
import BookDetails from "./BookDetails";

class SearchForm extends Component {
    state = {
        books : [],
        query : ''
    }

    //Ham search Api -> tra ve books object thay doi state va query
    handleUpdateQuery = (query) => {
        BooksAPI.search(query)
            .then(books => books ? this.setState({books}) : []);
        this.setState({
            query
        })
    }
    //Ham cap nhat shelf thi them book vao shelf
    handleBookShelf(book, shelf) {
        BooksAPI.update(book, shelf)
            //neu true ->
            .then(() => shelf !== 'none' ? alert(`${book.title} has been added to your shelf!`) : null)
            //Neu false ->
            .catch(() => alert('Something went wrong! Please try again!'));
    }
    // Show search results
    getListBooks(){
        const {books,query} = this.state;
        if (query){
            return books.error
                ? <div>No results found</div>
                : books.map((book,index) => (
                    <BookDetails
                        book = {book}
                        key = {index}
                        handleBookShelf={this.handleBookShelf.bind(this)}
                    />
                ))

        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                           value={this.state.query}
                           onChange={e => this.handleUpdateQuery(e.target.value) } //Lay gia tri cua value => handleUpdateQuery
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {/*Show list books*/}
                        {this.getListBooks()}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchForm
