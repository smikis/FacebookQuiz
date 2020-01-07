import React from 'react';
import './home.css';
import { Link } from "react-router-dom";
class Home extends React.Component {

    render() {
        return (
            <div className="container">
                <div id="home" className="flex-center flex-column">
                    <h1>Quiz</h1>
                    <Link class="btn" to="/question">Question</Link>
                </div>
            </div>
        );
    }
}

export default Home;