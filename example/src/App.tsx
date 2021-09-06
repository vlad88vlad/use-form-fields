import React from 'react';
import Router from './Router';
import './App.css';
import Input from './components/Input'
import {
    BrowserRouter
} from "react-router-dom";

function App() {
    return (
        <BrowserRouter basename={'/use-form-fields'}>
            <div className="App">
                <Router />
            </div>
        </BrowserRouter>
    );
}

export default App;
