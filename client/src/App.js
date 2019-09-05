import React from "react";
import login from "./pages/login";
import Nav from "./Components/Nav";
import myfridge from "./pages/myfridge";
import Footer from "./Components/Footer";
import camera from "./pages/camera";
import signup from "./pages/signup";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/myfridge" component={myfridge} />
          <Route exact path="/camera" component={camera} />
          <Route exact path="/signup" component={signup} />
        </Switch>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
