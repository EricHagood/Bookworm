import React, { Component } from 'react'
import '../App.css'

export default class NewForm extends Component {
    state = {
        title: "",
        authors: "",
        subtitle: "",
        description: "",
        thumbnail: "",
        smallimg:  "",
        isFavorite: false
    }

    
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
           
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(this.props.baseUrl + '/bookworm', {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                authors: this.state.authors,
                subtitle: this.state.subtitle,
                description: this.state.description,
                thumbnail: this.state.thumbnail,
                smallimg:  this.state.smallimg,
                isFavorite: this.state.isFavorite
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            return res.json();
        }).then(data => {
            this.props.addBook(data);
            this.setState({
                title: '',
                authors: '',
                subtitle: '',
                description: '',
                thumbnail:  '',       
                smallimg: '',
                isFavorite: '',
            });
        });
    }

    render() {
        return (
            <div className="add-container">
                <form className="add-form" onSubmit={ (evt) => this.handleSubmit(evt) }>
                    <div className="label-container">
                        <label htmlFor="title">Title: </label>
                        <label htmlFor="authors">Authors: </label>
                        <label htmlFor="subtitle">Subtitle: </label>
                        <label htmlFor="description">Description: </label>
                        <label htmlFor="thumbnail">Thumbnail: </label>
                    </div>
                    <div className="input-container">
                        <input type="text" id="title"
                            onChange={ (evt) => this.handleChange(evt) }
                            value={ this.state.title }/>
                        <input type="text" id="authors"
                            onChange={ (evt) => this.handleChange(evt) }
                            value={ this.state.authors }/>
                        <input type="text" id="subtitle"
                            onChange={ (evt) => this.handleChange(evt) }
                            value={ this.state.subtitle }/>   
                        <input type="text" id="description"
                            onChange={ (evt) => this.handleChange(evt) }
                            value={ this.state.description }/>  
                        <input type="text" id="thumbnail" placeholder='/img/book_default_thumbnail.jpeg'
                            onChange={ (evt) => this.handleChange(evt) }
                            value={ this.state.thumbnail }/>
                    </div>
                        <input className="form-button"type="submit" value="Add Book"/>
                </form>
            </div>
        )
    }
}