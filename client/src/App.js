import React, { Component } from "react";
import login from "./pages/login";
import "./App.css";
import Nav from "./Components/Nav";


function App() {
  return (
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route exact path="/"
        </Switch>
      </div>
    </Router>
  )
}

export default App;
