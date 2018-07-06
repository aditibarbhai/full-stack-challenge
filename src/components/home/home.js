import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EmployeeHome from './employee-home';
import { AdminHome } from './admin-home';

import { getEmployee } from '../../utilities/api-calls';

import './home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentEmployee: {},
            admin: false
        };
    }

    componentDidMount() {
        getEmployee(6).then(employee => this.setState({ currentEmployee: employee }));
    }

    render() {
        return (
            <Paper className="home-container">
                <Grid container spacing={24}>
                    <Grid item xs={12} md={9}>
                        <div className="banner" />
                    </Grid>
                    <Grid item xs={12} md={3} >
                        <Typography variant="display3" className="banner-title" > &#x221e; <br/> LOOP </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <h1> Welcome { `${this.state.currentEmployee.firstName} ${this.state.currentEmployee.lastName}` }! </h1>
                        <EmployeeHome employee={this.state.currentEmployee} />
                        {
                            this.state.admin &&
                            <AdminHome />
                        }
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
