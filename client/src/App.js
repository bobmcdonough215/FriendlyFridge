import React, { Component } from "react";
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
          <Route exact path="/" component={login} />
          <Route exact path="/myfridge" component={myfridge} />
          <Route exact path="/camera" component={camera} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
