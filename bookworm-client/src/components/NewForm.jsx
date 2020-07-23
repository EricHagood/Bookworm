import React, { Component } from 'react'

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
            <form onSubmit={ (evt) => this.handleSubmit(evt) }>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title"
                    onChange={ (evt) => this.handleChange(evt) }
                    value={ this.state.title }/>


                <label htmlFor="authors">Authors: </label>
                <input type="text" id="authors"
                    onChange={ (evt) => this.handleChange(evt) }
                    value={ this.state.authors }/>
                <label htmlFor="subtitle">Subtitle: </label>
                <input type="text" id="subtitle"
                    onChange={ (evt) => this.handleChange(evt) }
                    value={ this.state.subtitle }/>   

                <label htmlFor="description">Description: </label>
                <input type="text" id="description"
                    onChange={ (evt) => this.handleChange(evt) }
                    value={ this.state.description }/>  
                    
                <label htmlFor="thumbnail">Thumbnail: </label>
                <input type="text" id="thumbnail"
                    onChange={ (evt) => this.handleChange(evt) }
                    value={ this.state.thumbnail }/>
                    <input type="submit" value="Add Book"/>
            </form>
        )
    }
}