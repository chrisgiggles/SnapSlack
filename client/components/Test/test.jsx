import React from 'react';
import randomColor from './../../../common/utils/randomColor.js';

class Test extends React.Component {
    render() {
    	console.log('Test randomColor -->', randomColor());

    	styles = {
    		backgroundColor: "#" + randomColor()
    	}

        return (
            <div style={styles}>Hello World</div>
        );
    }
}

export default Test;