import React, {Component} from 'react'

export default class HomeView extends Component {
  
    render() {
        return (this.props.books.map( (book, index) => {
            return (<div key={index}>
              <div onClick={ () => { this.props.clickOnBook(book) } }>
                <p>Title: {book.title}</p>
                <p>Authors: { book.authors.toString() }</p>        
                <img src = {book.thumbnail} className="thumbnail" alt="books"></img>
              </div>
              {
                  !book.myCollection ?
                     <button onClick = {()=> {  book.myCollection = !book.myCollection; this.props.updateBook(book, index)}}>Add to Collection </button> : ''
              }
              {
                book.isFavorite ?
                  <button onClick={()=> {  book.isFavorite = !book.isFavorite; this.props.updateBook(book, index)}}>Unfavorite</button> : <button onClick={()=> {book.isFavorite = !book.isFavorite; this.props.updateBook(book, index)}}>Favorite</button>
              }
              <button onClick={()=> { this.props.deleteBook( book, index ) }}>Delete</button>
              </div>
              )
            
          }))
    }
}