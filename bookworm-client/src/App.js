
import React, { Component } from 'react'
import './App.css';
 

import NewForm from './components/NewForm';
import BookView from './components/BookView';
import CollectionView from './components/CollectionView';
import Search from './components/Search'

let baseUrl = 'http://localhost:3003'
export default class App extends Component {  
  constructor() {
    super();
    this.state = {
      books: [],
      clickedBook: null,
      collectionClicked : false
    };
  }
  
  componentDidMount() {
    this.getBook();
  }

  getBook() {
    fetch('http://localhost:3003/bookworm').then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        books: data
      });
    }).catch(err => {
      console.log('error', err);
    });
  };
  addBook = (newBook) => {
    const copyBooks = [...this.state.books];
    copyBooks.push(newBook);
    this.setState({
      books: copyBooks
    });
  }

  updateBook = (updateBook, index) => {
    fetch('http://localhost:3003/bookworm/' + updateBook._id, {
      method: 'PUT',
      body: JSON.stringify({
        title: updateBook.title,
        authors: updateBook.author,
        subtitle: updateBook.subtitle,
        description: updateBook.description,
        thumbnail: updateBook.thumbnail,
        smallimg: updateBook.smallimg, 
        isFavorite: updateBook.isFavorite   
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }).then(data => {       //true =false and false =true
      const copyBooks = [...this.state.books]
      copyBooks.splice(index, 1, data)
      this.setState({
          books:copyBooks
      });
    });
  }

  deleteBook = (deleteBook, index) => {
    fetch('http://localhost:3003/bookworm/' + deleteBook._id, {
      method: 'DELETE',
     
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }).then(data => {       
      const copyBooks = [...this.state.books]
      copyBooks.splice(index, 1)
      this.setState({
          books:copyBooks
      });
    });
  }

  render() {
    return (
      <div>
            <nav>
      <span>Home</span> 
      <span onClick={ () => {  } }>My Collections</span> 
      <span>Favorites</span> 
      {/* <form>
      <input type="text" id="search"/> 
      <input type="submit" value ="search"/>


      </form> */}
      <Search />
      </nav>
        <NewForm baseUrl={ baseUrl } addBook={ this.addBook}/>
        {
          this.state.clickedBook ? <BookView book={ this.state.clickedBook } /> : ''
        }
        {
          this.state.collectionClicked ? <CollectionView books={ this.state.books } /> : ''
        }
      {
        this.state.books.map( (book, index) => {
          return (<div key={index}>
            <div onClick={ () => { this.setState({ clickedBook : book }) } }>
              <p>title: {book.title}</p>
              <p>author: { book.authors }</p>        
              <img src = {book.thumbnail} alt="books"></img>
            </div>
            <button onClick = {()=>{this.updateBook(book, index)}}>Add to Collection </button>
            {
              book.isFavorite ?
                <button onClick={()=> {  book.isFavorite = !book.isFavorite; this.updateBook(book, index)}}>Unfavorite</button> : <button onClick={()=> {book.isFavorite = !book.isFavorite; this.updateBook(book, index)}}>Favorite</button>
            }
            </div>
            )
          
        })
      }
      </div>
    );
   }
}

 

