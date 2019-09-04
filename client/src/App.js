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
          <Route exact path="/" Component={login} />
          <Route exact path="/myfridge" Component={myfridge} />
          <Route exact path="/camera" Component={camera} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
