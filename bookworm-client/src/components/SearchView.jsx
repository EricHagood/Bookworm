import React, {Component} from 'react'

export default class SeachView extends Component {
  
    render() {
        return (this.props.books.map( (book, index) => {
            return (<div key={index}>
              <div onClick={ () => { this.props.clickOnBook(book) } }>
                <p>Title: {book.volumeInfo.title}</p>
                <p>Authors: { book.volumeInfo.authors.toString() }</p>        
                <img src = {book.volumeInfo.imageLinks ? (
                    book.volumeInfo.imageLinks.thumbnail
                    ) : (
                        ''
                    )} className="thumbnail" alt="books"></img>
              </div>
              {
                  !book.myCollection ?
                     <button onClick = {()=> {  book.myCollection = !book.myCollection; this.props.updateBook(book.volumeInfo, index)}}>Add to Collection </button> : ''
              }
              {
                book.isFavorite ?
                  <button onClick={()=> {  book.isFavorite = !book.isFavorite; this.props.updateBook(book, index)}}>Unfavorite</button> : <button onClick={()=> {book.isFavorite = !book.isFavorite; this.props.updateBook(book, index)}}>Favorite</button>
              }
              </div>
              )
            
          }))
    }
}