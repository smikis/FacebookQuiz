import React from 'react';
import './hud.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

class Hud extends React.Component {

    renderTime = value => {
        return (
            <div className="timer">{value}</div>
        );
      };

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
                <div id="hud-item">
                    <CountdownCircleTimer
                        isPlaying={this.props.timerIsRunning}
                        size={90}
                        durationSeconds={10}
                        renderTime={this.renderTime}
                        key={this.props.resetTimerKey}
                        onComplete={() => this.props.onComplete()}
                        colors={[
                            ['#004777', .33],
                            ['#F7B801', .33],
                            ['#A30000']
                        ]}
                    />
                </div>
            </div>
        );
    }
}

export default Hud;