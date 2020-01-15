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
            options: [],
            correctOptionId: '',
            acceptingAnswers: false
        };
    }


    async componentDidMount() {
        try {
            const question = await this.getQuestion();
            this.setState({
                question: question.text,
                options: question.options,
                correctOptionId: question.correctOptionId,
                acceptingAnswers: true
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getQuestion() {
        const response = await fetch(`https://localhost:44338/api/question/5`);
        const json = await response.json();

        this.currentQuestion++;

        return json;
    }

    onTimerComplete() {
        this.points--;

        this.setState({
            question: this.state.question,
            options: this.state.options,
            correctOptionId: this.state.correctOptionId,
            acceptingAnswers: false
        });

        const options = this.state.options.slice();
        const answer = options.find(x => x.id === this.state.correctOptionId);
        answer.class = 'correct-answer';

        this.setState({
            question: this.state.question,
            options: options,
            correctOptionId: this.state.correctOptionId
        });

        setTimeout(async () => {
            if (this.currentQuestion === this.totalQuestions) {
                this.props.history.push(`/end?score=${this.points}`);
            }
            else {
                const newQuestion = await this.getQuestion();
                this.setState({
                    question: newQuestion.text,
                    options: newQuestion.options,
                    correctOptionId: newQuestion.correctOptionId,
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
            options: this.state.options,
            correctOptionId: this.state.correctOptionId,
            acceptingAnswers: false
        });

        const answers = this.state.options.slice();
        const answer = answers.find(x => x.id === questionId);
        const correct = answer.id === this.state.correctOptionId;


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
            options: answers,
            correctOptionId: this.state.correctOptionId
        });

        setTimeout(async () => {
            if (this.currentQuestion === this.totalQuestions) {
                this.props.history.push(`/end?score=${this.points}`);
            }
            else {
                const newQuestion = await this.getQuestion();
                this.setState({
                    question: newQuestion.text,
                    options: newQuestion.options,
                    correctOptionId: newQuestion.correctOptionId,
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
                <Question question={this.state.question} answers={this.state.options} handleAnswerClick={this.handleAnswerClick.bind(this)} />
            </div>
        );
    }
}

export default withLocalize(withRouter(Game));