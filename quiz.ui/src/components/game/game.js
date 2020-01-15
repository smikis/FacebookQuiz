import React from 'react';
import './game.css';
import Question from '../question/questions';
import Hud from '../hud/hud';
import { withRouter } from 'react-router-dom';
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "../../translations/globalTranslations.json";
import { withLocalize } from "react-localize-redux";

class Game extends React.Component {
    //CONSTANTS
    totalQuestions = 10;

    currentQuestion = 0;
    correctAnswers = 0;
    points = 0;

    constructor(props) {
        super(props);

        props.initialize({
            languages: [
              { name: "English", code: "en" },
              { name: "French", code: "fr" }
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup }
          });

        this.state = {
            question: '',
            answers: [],
            correctAnswerId: '',
            acceptingAnswers: false
        };
    }


    async componentDidMount() {
        try {
            const question = await this.getQuestion();
            this.setState({
                question: question.question,
                answers: question.answers,
                correctAnswerId: question.correctAnswerId,
                acceptingAnswers: true
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getQuestion() {
        const response = await fetch(`http://localhost:3001/question`);
        const json = await response.json();

        this.currentQuestion++;

        return json;
    }

    onTimerComplete() {
        this.points--;

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

        setTimeout(async () => {
            if (this.currentQuestion === this.totalQuestions) {
                this.props.history.push(`/end?score=${this.points}`);
            }
            else {
                const newQuestion = await this.getQuestion();
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
        if (!this.state.acceptingAnswers) {
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


        if (correct) {
            answer.class = 'correct-answer';
            this.correctAnswers++;
            this.points++;
        }
        else {
            answer.class = 'incorrect-answer';
            this.points--;
        }

        this.setState({
            question: this.state.question,
            answers: answers,
            correctAnswerId: this.state.correctAnswerId
        });

        setTimeout(async () => {
            if (this.currentQuestion === this.totalQuestions) {
                this.props.history.push(`/end?score=${this.points}`);
            }
            else {
                const newQuestion = await this.getQuestion();
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
                    points={this.points}
                    correctAnswers={this.correctAnswers}
                    onComplete={this.onTimerComplete.bind(this)}
                    timerIsRunning={this.state.acceptingAnswers}
                    resetTimerKey={this.currentQuestion} />
                <Question question={this.state.question} answers={this.state.answers} handleAnswerClick={this.handleAnswerClick.bind(this)} />
            </div>
        );
    }
}

export default withLocalize(withRouter(Game));