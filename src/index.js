import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import Home from './components/home/home';
import Review from './components/review/review';
import 'typeface-roboto';
import './utilities/common.css';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/review/:id" exact component={Review} />
        </Switch> 
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
