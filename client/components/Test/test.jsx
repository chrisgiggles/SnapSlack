import React from 'react';


class Test extends React.Component {
    render() {
        console.log("test render {this.context -->", this.props.params.channelId);

        return (
            <div>Hello World</div>
        );
    }
}

export default Test;