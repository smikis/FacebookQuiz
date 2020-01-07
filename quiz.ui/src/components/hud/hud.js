import React from 'react';
import './hud.css';

class Hud extends React.Component {

    render() {
        return (
            <div id="hud">
                <div id="hud-item">
                    <p className="hud-prefix">Question</p>
                    <h1 className="hud-main-text">{this.props.currentQuestion + '/' + this.props.totalQuestions}</h1>
                </div>
                <div id="hud-item">
                    <p className="hud-prefix">Correct answers</p>
                    <h1 className="hud-main-text">{this.props.correctAnswers}</h1>
                </div>
            </div>
        );
    }
}

export default Hud;