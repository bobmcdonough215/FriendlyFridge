import React, { Component } from "react";
<<<<<<< HEAD
import login from "./pages/login";
import Nav from "./Components/Nav";
import myfridge from "./pages/myfridge";
import camera from "./pages/camera";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route exact path="/" Component={login} />
          <Route exact path="/myfridge" Component={myfridge} />
          <Route exact path="/camera" Component={camera} />
        </Switch>
=======

// import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
>>>>>>> 44dbce004fc56f27b040d703c569d4b0d05a8a6d
      </div>
    </Router>
  )
}

export default App;
