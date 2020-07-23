import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            baseURL: 'https://www.googleapis.com/books/v1/volumes?q=',
            bookName: '',
            searchURL: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this) 
    }
    
    handleChange(event){
        this.setState({[event.target.id]: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault()
        this.setState({
            searchURL: this.state.baseURL + this.state.bookName,
            bookName: ''
        }, () =>{
            fetch(this.state.searchURL).then(response => {
                return response.json()
            }).then(json => this.props.sendBooks(json))
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='bookName'>Book</label>
                    <input id='bookName' type='text' value={this.state.bookName} onChange={this.handleChange} />
                    <input type='submit' value='Search Books' />
                </form>
            </div>
        )
    }
}
