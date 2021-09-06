import React from 'react';
import {
    Switch,
    Route,
    Link
} from "react-router-dom";

import SimpleForm from './samples/SimpleForm'
import ValidationForm from './samples/ValidationForm'

const Home = () => {
    return (
        <div>
            <h1>use-form-fields</h1>
            <Link to='/simple-form'>simple form</Link>
            <Link to='/validation-form'>validation form</Link>
        </div>
    )
}

const Router = () => {
    return (
        <Switch>
            <Route path="/simple-form" component={SimpleForm} />
            <Route path="/validation-form" component={ValidationForm} />
            <Route path="/" component={Home} />
        </Switch>
    );
};

export default Router;
