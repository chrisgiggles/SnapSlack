import React from 'react';

class ChannelCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        }
    }

    handleChange(e, value) {
        switch (value) {
            case 'name':
                this.setState({name: e.target.value});
                break;
            case 'description':
                this.setState({description: e.target.value});
                break;
            default:
                break;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if ( this.state.name.trim() && this.state.description.trim() ) {
            const obj = {
                name: this.state.name,
                description: this.state.description
            };
            console.log("ChannelCreate handleSubmit obj -->", obj);
            Meteor.call('newChannel', obj);
        }
    }

    render() {
        return (
            <form
                action="#"
                onSubmit={ (e) => {this.handleSubmit(e)} }>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    onChange={ (e) => {this.handleChange(e, 'name')} } />
                <br/>
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    type="text"
                    onChange={ (e) => {this.handleChange(e, 'description')} } />
                <input type="submit"/>
            </form>
        );
    }
}

export default ChannelCreate;