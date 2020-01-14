import React from 'react';
import './game.css';
import Question from '../question/questions';
import Hud from '../hud/hud';
import {
    withRouter
  } from 'react-router-dom';

class Game extends React.Component {
    //CONSTANTS
    totalQuestions = 3;

    currentQuestion = 0;
    correctAnswers = 0;

    constructor(props) {
        super(props);

        const question = this.getQuestion();
        this.state = {
            question: question.question,
            answers: question.answers,
            correctAnswerId: question.correctAnswerId,
            acceptingAnswers: true
        };
    }

    getQuestion() {
        this.currentQuestion++;

        const question = {
            question: 'In what continent is located Lithuania?' + Math.random(),
            answers: [
                {
                    id: 1,
                    text: "Europe",
                    prefix: 'A'
                },
                {
                    id: 2,
                    text: "Asia",
                    prefix: 'B'
                },
                {
                    id: 3,
                    text: "Africa",
                    prefix: 'C'
                },
                {
                    id: 4,
                    text: "Oceania",
                    prefix: 'D'
                }
            ],
            correctAnswerId: 1
        };
        return question;
    }

    onTimerComplete() {
        this.setState({
            question: this.state.question,
            answers: this.state.answers,
            correctAnswerId: this.state.correctAnswerId,
            acceptingAnswers: false
        });

        const answers = this.state.answers.slice();
        const answer = answers.find(x => x.id === this.state.correctAnswerId);
        answer.class = 'correct-answer';

        this.setState({
            question: this.state.question,
            answers: answers,
            correctAnswerId: this.state.correctAnswerId
        });

        setTimeout(() => {
            if (this.currentQuestion === this.totalQuestions) {
                this.props.history.push('/end');
            }
            else {
                const newQuestion = this.getQuestion();
                this.setState({
                    question: newQuestion.question,
                    answers: newQuestion.answers,
                    correctAnswerId: newQuestion.correctAnswerId,
                    acceptingAnswers: true
                });
            }
        }, 1000);
    }

    handleAnswerClick(questionId) {
        if (!this.acceptingAnswers) {
            return;
        }

        this.setState({
            question: this.state.question,
            answers: this.state.answers,
            correctAnswerId: this.state.correctAnswerId,
            acceptingAnswers: false
        });

        const answers = this.state.answers.slice();
        const answer = answers.find(x => x.id === questionId);
        const correct = answer.id === this.state.correctAnswerId;

        answer.class = 'incorrect-answer';
        if (correct) {
            answer.class = 'correct-answer';
            this.correctAnswers++;
        }

        this.setState({
            question: this.state.question,
            answers: answers,
            correctAnswerId: this.state.correctAnswerId
        });

        setTimeout(() => {
            if (this.currentQuestion === this.totalQuestions) {
                this.props.history.push('/end');
            }
            else {
                const newQuestion = this.getQuestion();
                this.setState({
                    question: newQuestion.question,
                    answers: newQuestion.answers,
                    correctAnswerId: newQuestion.correctAnswerId,
                    acceptingAnswers: true
                });
            }

        }, 1000);
    }

    render() {
        return (
            <div className="container justify-center flex-column">
                <Hud
                currentQuestion={this.currentQuestion}
                totalQuestions={this.totalQuestions}
                correctAnswers={this.correctAnswers}
                onComplete={this.onTimerComplete.bind(this)}
                timerIsRunning={this.state.acceptingAnswers}
                resetTimerKey={this.currentQuestion}/>
                <Question question={this.state.question} answers={this.state.answers} handleAnswerClick={this.handleAnswerClick.bind(this)} />
            </div>
        );
    }
}

export default withRouter(Game);