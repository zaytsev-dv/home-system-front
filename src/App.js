import LoginForm from "./components/loginForm";
import React from "react";
import {Router} from "@reach/router";

function App() {
    return (
        <div className="App">
            <Router>
                <LoginForm exact path="/login"/>
            </Router>
        </div>
    );
}

export default App;
