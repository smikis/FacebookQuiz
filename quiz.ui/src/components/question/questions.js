import React from 'react';
import './question.css';

class Question extends React.Component {

    render() {
        return (
                <div>
                    <h2>{this.props.question}</h2>
                    {this.props.answers.map((answer) => {
                        return (
                            <div key={answer.id} className={"choice-container " + answer.class} onClick={() => this.props.handleAnswerClick(answer.id)}>
                            <p className="choice-prefix">A</p>
                            <p className="choice-text">{answer.text}</p>
                        </div>
                        );
                    })}
                </div>
        );
    }
}

export default Question;