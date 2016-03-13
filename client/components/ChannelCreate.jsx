import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
export default class ChannelCreate extends React.Component {

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
            <div className="ChannelCreate">
                <Scrollbars>
                    <div className="inner">
                        <h1>Create a new channel</h1>
                        <form
                            action="#"
                            onSubmit={ (e) => {this.handleSubmit(e)} }>
                            <label htmlFor="name">Name</label><br/>
                            <input
                                id="name"
                                type="text"
                                onChange={ (e) => {this.handleChange(e, 'name')} } />
                            <br/>
                            <label htmlFor="description">Description</label><br/>
                            <input type="text"
                                   id="description"
                                   onChange={ (e) => {this.handleChange(e, 'description')} }>
                            </input>
                            <br/>
                            <input type="submit"/>
                        </form>
                    </div>
                </Scrollbars>
            </div>
        );
    }
}