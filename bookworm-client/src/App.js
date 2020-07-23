
import React, { Component } from 'react'
import './App.css';
 

import NewForm from './components/NewForm';
import BookView from './components/BookView';
import CollectionView from './components/CollectionView';
import FavoriteView from './components/FavoriteView';
import HomeView from './components/HomeView';
import Search from './components/Search'

let baseUrl = 'http://localhost:3003'
export default class App extends Component {  
  constructor() {
    super();
    this.state = {
      books: [],
      clickedBook: null,
      currentView : 'home', // home, collection, favorite
      returnedBooks: []
    };
    this.recieveBooks = this.recieveBooks.bind(this)
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
        isFavorite: updateBook.isFavorite,
        myCollection:  updateBook.myCollection
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

  clickOnBook = (book) => {
    this.setState({
      clickedBook : book
    })
  }

  ViewRender = () => {
    if (this.state.currentView === 'home') {
      return <HomeView books={this.state.books} updateBook={this.updateBook} clickOnBook={this.clickOnBook} deleteBook={this.deleteBook}/>
    } else if (this.state.currentView === 'my_collection') {
      let my_collection = []
      for (let i = 0; i < this.state.books.length; i++) {
          if (this.state.books[i].myCollection === true) {
            my_collection.push(this.state.books[i])
          }
      }
      return <CollectionView books={my_collection} clickOnBook={this.clickOnBook} />
    } else if (this.state.currentView === 'favorites') {
      let favorites = []
      for (let i = 0; i < this.state.books.length; i++) {
          if (this.state.books[i].isFavorite === true) {
            favorites.push(this.state.books[i])
          }
      }
      return <FavoriteView books={favorites} clickOnBook={this.clickOnBook} />
    }
  }

  recieveBooks(data){
    this.setState({
      recieveBooks: data
    })
  }
      
  render() {
    return (
      <div>
        <div className="header-container">
          <header>
            <h1 className="main-title">BOOKworm</h1>
          </header>
        </div>
      <div div className="nav-container">
        <nav>
          <span onClick={ () => { this.setState({ currentView : 'home' }) } }>Home </span> 
          <span onClick={ () => { this.setState({ currentView : 'my_collection' }) } }> My Collections</span> 
          <span onClick={ () => { this.setState({ currentView : 'favorites' }) } }> Favorites</span> 
        </nav>
          <Search returnedBooks={this.state.returnedBooks} sendBooks = {this.recieveBooks} />
       
      </div>
        <NewForm baseUrl={ baseUrl } addBook={ this.addBook}/>
        {
          this.state.clickedBook ? <BookView book={ this.state.clickedBook } /> : ''
        }
      <this.ViewRender />
      </div>
    );
   }
}

 

