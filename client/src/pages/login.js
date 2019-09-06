import React, { Component } from "react";
import { Input, FormBtn, } from "../Components/Form";
import { Redirect } from 'react-router-dom'
import { Col, Row, Container } from "../Components/Grid";
import { Link } from "react-router-dom";
import axios from 'axios';
// import { Container, Row, Col } from "../Components/Grid";
import "./login.css";
import Img from "../Components/images/jakub-kapusnak-vnNFWKY7Tj4-unsplash.jpg";


class login extends Component {
    constructor() {
        super();
    this.state = {
        username: '',
        password: '',
        redirectTo: null,

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
        event.preventDefault();
        console.log('sign-up-form, username: ');
        console.log(this.state.email);
        // request connection with server below
        axios.post('/user/login/', {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    this.setState({
                        redirectTo: "/myfridge/"
                    })
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
                <Container>
            
                    <h4>Login</h4>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="username">Username</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="password">Password: </label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    placeholder="password"
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <button
                                className="btn btn-primary"
                               
                                onClick={this.handleFormSubmit}
                                type="submit">Login</button>
                        </div>
                    </form>
                 <p className="signUp">Don't have an account? <Link to="/signup">Create an account</Link></p>
                 </Container>
            )
        }
    }
}


export default login;