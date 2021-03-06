import React, { Component } from "react";
import axios from "axios";
import Login from "./pages/login";
import Nav from "./Components/Nav";
import MyFridge from "./pages/myfridge";
import Footer from "./Components/Footer";
import additem from "./pages/additem";
import signup from "./pages/signup";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })

        console.log("Logged in?")
        console.log(this.state.loggedIn);
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render(){
  return (
    <Router>
      <div>
        <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Switch>
        <Route exact path="/" render={() => (
            (this.state.loggedIn) ?
              <Redirect to="/myfridge"/>
            :
              <Redirect to="/login"/>
        )}/>
        <Route
          exact path="/login"
          render={() =>
            <Login
              updateUser={this.updateUser}
            />}
        />
        <Route
          exact path="/myfridge"
            component={MyFridge} />
          }
        />
        <Route path="/myfridge" component={MyFridge} />
          <Route exact path="/additem" component={additem} />
          <Route exact path="/signup" component={signup} />
        </Switch>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
  }
}

export default App;
