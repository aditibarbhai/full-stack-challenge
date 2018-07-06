import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send'
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { withStyles } from '@material-ui/core/styles';
import { addReview, updateReview, updateTodo } from '../../utilities/api-calls';

import './review.css';

const styles = {
    backButton: {
        background: 'white',
        boxShadow: 'none',
        color: 'black',
        '&:hover': {
            color: 'white',
            background: '#dadada'
        }
    }
};

export class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            connection: '',
            review: '',
            reviewer: props.location.state ? props.location.state.reviewer : {},
            reviewee: props.location.state ? props.location.state.todo.toReview : {},
            todo: props.location.state ? props.location.state.todo : {},
        };

        this.updateConnectionText = this.updateConnectionText.bind(this);
        this.updateReviewText = this.updateReviewText.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleSendClick = this.handleSendClick.bind(this);
    }

    componentDidMount() {
        const { match } = this.props;
        // getEmployee(match.params.id).then(reviewee => this.setState({ reviewee }));
    }

    updateConnectionText(event) {
        console.log(event.target.value);
        this.setState({ connection: event.target.value });
    }

    updateReviewText(event) {
        this.setState({ review: event.target.value });
    }

    submitReview(published) {
        let review = {
            connection: this.state.connection,
            review: this.state.review,
            reviewer: this.state.reviewer.id,
            reviewee: this.state.reviewee.id,
            published
        };

        if (this.state.id) {
            review.id = this.state.id;
        }

        if (!this.state.id) {
            // create new entry for this review
            return addReview(review);
        } else {
            // update review in DB
            return updateReview(review);
        }
    }

    handleSaveClick() {
        this.submitReview(false).then(response => {
            this.setState({ id: response.id });
        });
    }

    handleSendClick(event) {
        event.preventDefault();

        this.submitReview(true).then(response => {
            this.setState({ id: response.id });

            let updatedToDo = {
                ...this.state.todo,
                completed: true
            };

            // update "todo" and set it as done
            updateTodo(updatedToDo).then(response => {
                // navigate back to home page
                this.props.history.push('/');
            });
        });
    }

    render() {
        return (
            <Paper className="review-form-container">
                <Grid container spacing={16}>
                    <Grid className="navigation" item xs={12}>
                        <Button
                            onClick={() => this.props.history.push('/')}
                            variant="fab" color="primary"
                            aria-label="back"
                            className={this.props.classes.backButton}
                        >
                            <ArrowBackIcon className="icon-back" />
                        </Button>
                    </Grid>
                    <Grid className="employee-info" item md={3} xs={12}>
                        <div className="image-frame">
                            <img src={this.state.reviewee.avatar} alt={`${this.state.reviewee.firstName} ${this.state.reviewee.lastName}`} />
                        </div>
                        <Typography variant="title"> { `${this.state.reviewee.firstName} ${this.state.reviewee.lastName}` } </Typography>
                    </Grid>
                    <Grid item md={9} xs={12} className="form">
                        <form>
                            <TextField
                                id="connection"
                                label={`How do you know ${this.state.reviewee.firstName}?`}
                                value={this.state.connection}
                                margin="normal"
                                onChange={this.updateConnectionText}
                                fullWidth
                            />
                            <TextField
                                id="feedback"
                                label={`What feedback would you like to provide ${this.state.reviewee.firstName}?`}
                                value={this.state.review}
                                margin="normal"
                                rows={3}
                                rowsMax={10}
                                onChange={this.updateReviewText}
                                fullWidth
                                multiline
                            />

                            <div className="review-action-buttons">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="button-save"
                                    onClick={this.handleSaveClick}
                                    disabled={(!this.state.connection && !this.state.review)}
                                >
                                    <SaveIcon className="icon-save" />
                                    Save
                                </Button>

                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    className="button-send"
                                    onClick={this.handleSendClick}
                                    disabled={(!this.state.connection || !this.state.review)}
                                >
                                    Send
                                    <SendIcon className="icon-send" />
                                </Button>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Review);
