import React from 'react';
import Button from '@material-ui/core/Button';

class SimpleButton extends React.Component {
    render() {
        return (
            <Button variant="outlined" onClick={this.props.onClick}>{this.props.text}</Button>
        );
    }
}

export default SimpleButton;