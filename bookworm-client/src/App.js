import React from 'react';

import './App.css';

import NewForm from './components/NewForm';

let baseUrl = 'http://localhost:3003'
export default class App extends React.Component {

  
  constructor() {
    super();
    this.state = {
      books: []
    };
  }
  
  componentDidMount() {
    this.getBook();
  }

  getBook() {
    fetch('http://localhost:3003/books').then(response => {
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
    });
  }

  updateBook = (updateBook, index) => {
    fetch('http://localhost:3003/books/' + updateBook._id, {
      method: 'PUT',
      body: JSON.stringify({
        title: updateBook.title,
        authors: updateBook.author,
        subtitle: updateBook.subtitle,
        description: updateBook.description,
        thumbnail: updateBook.thumbnail,
        smallimg: updateBook.smallimg, 
        isFavorite: updateBook.isFavorite   //????????????????
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
    fetch('http://localhost:3003/books/' + deleteBook._id, {
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
        <NewForm baseUrl={ baseUrl } addBook={ this.addBook}/>
      {
        this.state.books.map( (book, index) => {
          return (<div key={index}><p>title: {book.title}</p>
              <p>author: { book.author }</p>
              <p>subtitle: { book.subtitle }</p> 
              <p>description: { book.description }</p>
              <p>thumbnail: { book.thumbnail }</p>              
              <img src = {book.image} alt="books"></img>
              <p>isFavorite: { book.isFavorite }</p>
              <button onClick = {()=>{this.updateBook(book, index)}}>Add to Collection </button>
              <button onClick={()=> {this.updateBook(book, index)}}>Unfavorite</button>
              </div>
            )
          
        })
      }
      </div>
    );
   }
}

 

