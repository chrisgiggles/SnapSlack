import React from 'react';

export default class OnlineStatus extends React.Component {
    render() {
        const className = this.props.status ? 'OnlineStatus online' : 'OnlineStatus offline';
        return (
            <div className={className}></div>
        );
    }
}

OnlineStatus.propTypes = {
};