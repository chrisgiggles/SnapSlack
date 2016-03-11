import React from 'react';
import Modal from 'react-modal';
import ChannelSettings from './ChannelSettings.jsx';

export default class ChatAdminSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    closeModal() {
        //e.preventDefault();
        this.setState({ openModal: false});
    }

    openModal(e) {
        e.preventDefault();
        this.setState({ openModal: true});
    }

    render() {
        return (
            <div className="ChatAdminSettings">
                <a href="#" onClick={ (e) => { this.openModal(e) }}>Settings</a>
                <Modal isOpen={ this.state.openModal}
                       onRequestClose={ () => { this.closeModal() }}>
                    <a href="#" onClick={ () => { this.closeModal() }}>Close</a>
                    <ChannelSettings id={this.props.id} closeModal={ () => this.closeModal() } />
                </Modal>
            </div>
        );
    }
}

ChatAdminSettings.propTypes = {
    id: React.PropTypes.string.isRequired
};