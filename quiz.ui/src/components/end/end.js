import React from 'react';
import './end.css';
import queryString from 'query-string';
import {
    withRouter
} from 'react-router-dom';

class End extends React.Component {

    constructor(props) {
        super(props);

        const values = queryString.parse(props.location.search);
        this.state = {
            score: values.score
        };
    }

    render() {
        return (
            <div className="container">
                <div id="end" className="flex-center flex-column">
                    <h1 id="finalScore">{this.state.score}</h1>
                </div>
            </div>
        );
    }
}

export default withRouter(End);