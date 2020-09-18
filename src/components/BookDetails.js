import React,{Component} from 'react'

const BookDetails = ({book,index,handleBookShelf}) => {
    console.log(handleBookShelf)
    const image = book.imageLinks ? book.imageLinks.smallThumbnail : null;
    const title = book.title;
    const authors = book.authors;
    return (
        <li key={index}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${image}")` }}></div>
                    <div className="book-shelf-changer">
                        {/*Ham onChange... de lay gia tri shelf trong value vao ham handleBookShelf de cap nhat shelf*/}
                        <select onChange={e => handleBookShelf(book,e.target.value)} value={book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    )
}

export default BookDetails
