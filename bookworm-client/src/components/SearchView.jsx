import React, {Component} from 'react'

export default class SeachView extends Component {

   
    render() {
        return (this.props.books.map( (book, index) => {
            return (<div className='column-container' key={index}>
              <div className='book-container' >
                <p>{book.volumeInfo.title}</p>
                <p>{ book.volumeInfo.authors.toString() }</p>        
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