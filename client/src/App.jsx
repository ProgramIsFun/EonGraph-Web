import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from "./components/minorsss/Login";
import "./App.css";
import withAuthentication from './containers/withAuthentication';

import Dashboard2 from "./components/minorsss/Dashboard2";



function App() {

    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route path="/dashboard" component={withAuthentication(Dashboard2)}/>
                <Redirect from="/" to="/login"/>
                {/*<Route exact path="/" component={Home}/>*/}
            </Switch>
        </Router>

    );
}

export default App;
