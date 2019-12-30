import React from 'react';
import SimpleButton from '../button/button';
import Grid from '@material-ui/core/Grid';

class Question extends React.Component {

    handleAnswerClick(questionId) {
        const answer = this.props.answers.find(x => x.id === questionId);
        const correct = answer.id === this.props.correctAnswerId;
        if (correct) {
            console.log('Correct');
        }
        else {
            console.log('incorrect');
        }
    }

    render() {
        return (
            <div>
                <label>{this.props.question}</label>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    {this.props.answers.map((answer, index) => {
                        return (
                            <SimpleButton item key={answer.id} onClick={() => this.handleAnswerClick(answer.id)} text={answer.text}></SimpleButton>
                        );
                    })}
                </Grid>
            </div>
        );
    }
}

export default Question;