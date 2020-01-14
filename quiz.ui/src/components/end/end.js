import React from 'react';
import './end.css';

class End extends React.Component {

    render() {
        return (
            <div className="container">
                <div id="end" className="flex-center flex-column">
                    <h1 id="finalScore">0</h1>
                </div>
            </div>
        );
    }
}

export default End;