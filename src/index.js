import React from 'react';
import ReactDOM from 'react-dom';
import Background from './components/Background'
import Signin from './components/Signin'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path="/">
                    <Signin/>
                </Route>
                <Route 
                    path='/simulation'
                    component={Background}>
                </Route>
            </Switch>
        </div>
    </Router>
    ,
    document.getElementById('root')
);
