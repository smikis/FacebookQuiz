import React from 'react';
import './game.css';
import Question from '../question/questions';
import Hud from '../hud/hud';

class Game extends React.Component {
    //CONSTANTS
    totalQuestions = 10;

    acceptingAnswers = true;
    currentQuestion = 0;
    correctAnswers = 0;

    constructor(props) {
        super(props);

        const question = this.getQuestion();
        this.state = {
            question: question.question,
            answers: question.answers,
            correctAnswerId: question.correctAnswerId
        };
    }

    getQuestion() {
        this.currentQuestion++;

        const question = {
            question: 'In what continent is located Lithuania?' + Math.random(),
            answers: [
                {
                    id: 1,
                    text: "Europe"
                },
                {
                    id: 2,
                    text: "Asia"
                },
                {
                    id: 3,
                    text: "Africa"
                },
                {
                    id: 4,
                    text: "Oceania"
                }
            ],
            correctAnswerId: 1
        };
        return question;
    }


    handleAnswerClick(questionId) {

        if (!this.acceptingAnswers) {
            return;
        }
        this.acceptingAnswers = false;

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
            const newQuestion = this.getQuestion();
            this.setState({
                question: newQuestion.question,
                answers: newQuestion.answers,
                correctAnswerId: newQuestion.correctAnswerId
            });
            this.acceptingAnswers = true;
        }, 1000);
    }

    render() {
        return (
            <div className="container justify-center flex-column">
                <Hud currentQuestion={this.currentQuestion} totalQuestions={this.totalQuestions} correctAnswers={this.correctAnswers} />
                <Question question={this.state.question} answers={this.state.answers} handleAnswerClick={this.handleAnswerClick.bind(this)} />
            </div>
        );
    }
}

export default Game;