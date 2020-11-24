import ReactDOM from "react-dom";
import App from "./App";
import React from "react";


function setup() {
    console.log("run setup function")
}

function run() {
    const container = document.getElementById("root");
    ReactDOM.render(
        <App />,
        container
    );
}

// setup().then(() => run());
setup();
run();
