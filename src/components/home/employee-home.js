import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'; 

import { getToDos } from '../../utilities/api-calls';

export class EmployeeHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todo: [],
            touched: false
        };

        this.handleReviewLinkClick = this.handleReviewLinkClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.todo.length && !prevState.touched) {
            getToDos(this.props.employee.id).then(todo => {
                this.setState({ todo, touched: true });
            });
        }
    }

    handleReviewLinkClick(id, todo) {
        this.props.history.push('/review/' + id, { reviewer: this.props.employee, todo });
    }

    renderToDo() {
        return this.state.todo.map((item, index) => {
            let title = (
                <a className="review-link" onClick={() => this.handleReviewLinkClick(item.toReview.id, item)} >
                    <span className="truncate"> {`${item.toReview.firstName} ${item.toReview.lastName}`} </span>
                </a>
            );

            if (item.completed) {
                title = (
                    <span className="review-link">
                        <span className="truncate"> {`${item.toReview.firstName} ${item.toReview.lastName}`} </span>
                        <CheckCircleIcon className="review-completed" />
                    </span>
                );
            }

            return (
                <GridListTile className="todo-review-employee" key={item.employee + '-' + index}>
                    <img src={item.toReview.avatar} alt={`${item.toReview.firstName} ${item.toReview.lastName}`} />
                    <GridListTileBar title={title} />
                </GridListTile>
            );
        });
    }
    
    render() {
        return (
            <div>
                <p>
                    A part of creating an open, collaborative workspace is giving and getting good feedback. <em>Loop</em> gives our employees the opportunity to express their views, compliments, and concerns about the company and their co-workers.  By giving honest, constructive feedback you can help your co-workers excel at their job and help make this a better workplace.
                </p>
                {
                    this.state.todo.length > 0 &&
                    <GridList cellHeight={180} className="todo-list">
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                            <ListSubheader className="header" component="div">
                                <Typography variant="subheading" gutterBottom>
                                    Please submit your feedback for the following co-worker(s):
                                </Typography>
                            </ListSubheader>
                        </GridListTile>
                        { this.renderToDo() }
                    </GridList>
                }
                {
                    !this.state.todo.length &&
                    <p>
                        <em> You currently have no co-workers requiring feedback </em>
                    </p>
                }
            </div>
        );
    }
}

EmployeeHome.propTypes = {
    employee: PropTypes.object.isRequired
};

export default withRouter(EmployeeHome);
