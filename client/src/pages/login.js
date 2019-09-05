import React, { Component } from "react";
import { Input, FormBtn, } from "../Components/Form";
import axios from 'axios';
// import { Container, Row, Col } from "../Components/Grid";
import "./login.css";
import { Link } from "react-router-dom";

class login extends Component {
    constructor() {
        super()
        state = {
            email: "",
            password: "",
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    

        handleInputChange = event => {
            const { name, value } = event.target;
            this.setState({
                [name]: value
            });
        };


    }

    handleFormSubmit = event => {
        event.preventDefault();
        console.log('sign-up-form, username: ');
        console.log(this.state.email);
        // request connection with server below
        axios.post('/user/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    console.log('sucessful signup')
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username

                    })

                    this.setState({
                        redirectTo: '/myfridge'
                    })
                } else {
                    console.log('Sign-up error');
                }
            }).catch(error => {
                console.log('sign up server error: ')
                console.log(error);
            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <h4>Login</h4>
                <div className="form-group">
                    <div className="background">
                        <div className="container">
                        </div>
                        <div className="welcome"><h2>Welcome to Friendly Fridge!</h2></div>

                        <div className="user">Email
                                     <Input
                                type="email"
                                value={this.state.login}
                                onChange={this.handleInputChange}
                                name="email"
                                placeholder="email (required)"
                            /></div>
                        <div className="password">Password
                                     <input
                                type="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                placeholder="password(required)"
                            /></div>
                        <div className="buttonContainer">
                            <FormBtn
                                disabled={!(this.state.login && this.state.password)}
                                onClick={this.handleFormSubmit}
                            >Login</FormBtn>

                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default login;