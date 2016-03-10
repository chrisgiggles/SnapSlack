import React from 'react';

export default class AdminBadge extends React.Component {
    render() {
        if ( this.props.isAdmin ) {
            return (
                <span className="AdminBadge">admin</span>
            );
        } else {
            return false;
        }

    }
}

AdminBadge.propTypes = {
    isAdmin: React.PropTypes.bool
};