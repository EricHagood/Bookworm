import React, {Component} from 'react'

export default class SeachView extends Component {

   
    render() {
        return (this.props.books.map( (book, index) => {
            return (<div key={index}>
              <div className='book-container' >
                <p>Title: {book.volumeInfo.title}</p>
                <p>Authors: { book.volumeInfo.authors.toString() }</p>        
                <img src = {book.volumeInfo.imageLinks ? (
                    book.volumeInfo.imageLinks.thumbnail
                    ) : (
                        ''
                    )} className="thumbnail" alt="books"></img>
                    <button className='book-add-button' onClick={()=> { this.props.addBookFromApi( book ) }}>Add</button>
              </div>
              

    
              </div>
              )
            
          }))
    }
}