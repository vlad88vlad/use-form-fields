import React from 'react';
import Router from './Router';
import './App.css';
import {
    HashRouter
} from "react-router-dom";

function App() {
    return (
        <HashRouter>
            <div className="App">
                <Router />
            </div>
        </HashRouter>
    );
}

export default App;
