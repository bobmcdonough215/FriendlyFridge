import React, { Component } from "react";
import { Input, FormBtn, } from "../Components/Form";
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { Container, Row, Col } from "../Components/Grid";
import "./signup.css";
import Img from "../Components/images/jakub-kapusnak-vnNFWKY7Tj4-unsplash.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class signup extends Component {
    constructor(){
        super()
    this.state = {
        username: "",
        password: "",
        confirmPassword: "",
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
this.handleInputChange = this.handleInputChange.bind(this)

    }

handleInputChange(event) {
    this.setState({
        [event.target.name]: event.target.value

    });
};

handleFormSubmit(event) {
    console.log(this.state.username);
    event.preventDefault();
    // request connection with server below
    axios.post('/user/signup/', {
        username: this.state.username,
        password: this.state.password
    })
        .then(response => {
            console.log(response)
            if (response.data) {
                console.log('sucessful signup')
                // Create an empty fridge on signup
                axios.post("/submit", {foods: []})
                .then(response => {
                    console.log("created empty fridge");
                    console.log(response);
                    this.setState({
                        redirectTo: '/myfridge'
                    })
                })
                .catch(err => console.log(err));
            } else {
                console.log('Sign-up error');
            }
        }).catch(error => {
            console.log('sign up server error: ')
            console.log(error);
        })
}

render() {
    return (
        <Container>
            <Row>
                <h2 className="textstyle">Welcome to Friendly Fridge!</h2>

            </Row>
            <div class="container center_div">
                <div className="SignupForm">
                    <form className="form-horizontal">
                        <div className="form-group">

                            <label className="form-label" className="textstyle" htmlFor="username">Username</label>
                            <input className="form-input"
                                type="text"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                name="username"
                                placeholder="Username"
                            /></div>
                        <div className="form-group">
                            <label className="form-label" className="textstyle" htmlFor="password">Password</label>
                            <input className="form-input"
                            type="password"
                                value={this.state.password}
                            onChange={this.handleInputChange}
                            name="password"
                            placeholder="password(required)"
                            /></div>
                            <button
                            className="btn btn-primary signUpButton"
                                onClick={this.handleFormSubmit}
                                type="submit"
                            >Sign Up</button>
                                </form>
                            </div>
                </div>
                <p className="registerText" className="textstyle">Already have an account? <Link to="/">Sign in</Link></p>
</Container>
                )
            }
        }
        
export default signup;