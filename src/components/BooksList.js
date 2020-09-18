import React,{Component} from 'react'
import { Link } from "react-router-dom";
import BookDetails from "./BookDetails";
import * as BooksAPI from "../BooksAPI"

class BooksList extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }
    //Ham update lai state khi them hoac thay doi shelf
    handleBookShelf(book, shelf) {
        BooksAPI.update(book, shelf).then(() => this.getBooks());
    }

    //Ham goi Api
    componentDidMount() {
        this.getBooks();
    }

    //Ham GET API all -  phan chia book theo tung shelf
    getBooks = () => {
        BooksAPI.getAll()
            .then((books) => {
                let currentlyReading = books ? books.filter(book => (book.shelf == 'currentlyReading')) : null;
                let wantToRead = books ? books.filter(book => (book.shelf == 'wantToRead')) : null;
                let read = books ? books.filter(book => (book.shelf == 'read')) : null;

                this.setState({ currentlyReading, wantToRead, read });
            })
    }

    //Ham chia tung shelf
    renderShelf = (books,title) => {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            //in vong lap book
                            books.map((book,index) => (
                                <BookDetails
                                    book= {book}
                                    key = {index}
                                    handleBookShelf={this.handleBookShelf.bind(this)}
                                />
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }

    render() {
        const { currentlyReading, wantToRead, read } = this.state;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>

                        {this.renderShelf(currentlyReading,'currentlyReading')}
                        {this.renderShelf(wantToRead,'wantToRead')}
                        {this.renderShelf(read,'read')}

                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>
                        <button >Search</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default BooksList
