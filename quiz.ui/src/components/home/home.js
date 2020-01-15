import React from 'react';
import './home.css';
import { Link } from "react-router-dom";
class Home extends React.Component {

    render() {
        return (
            <div className="container">
                <div id="home" className="flex-center flex-column">
                    <h1>Quiz Land</h1>
                    <Link class="btn" to="/question">Play</Link>
                    <Link class="btn" to="/question">Leaderboard</Link>
                    <Link class="btn" to="/settings">Settings</Link>
                </div>
            </div>
        );
    }
}

export default Home;