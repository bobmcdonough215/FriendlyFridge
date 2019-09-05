import React, { Component } from "react";
import { Input, FormBtn, } from "../Components/Form";
import axios from 'axios';
// import { Container, Row, Col } from "../Components/Grid";
import "./signup.css";
import Img from "../Components/images/jakub-kapusnak-vnNFWKY7Tj4-unsplash.jpg";
import { Link } from "react-router-dom";

class signup extends Component {
    state = {
        email: "",
        login: "",
        password: "",
        firstName: "",
        lastName: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log('sign-up-form, username: ');
        console.log(this.state.email);
        // request connection with server below
        axios.post('/', {
            email: this.state.email,
            username: this.state.login,
            password: this.state.password
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    console.log('sucessful signup')
                    this.setState({
                        redirectTo: '/login'
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

        return (
            // <Container fluid>
            //     <Container>
            //         <Row>
            //             <Col size="md-4">
            //             </Col>
            //             <Col size="md-4">
            <div className="background">
                <div className="container">

                    <div className="welcome"><h2>Welcome to Friendly Fridge!</h2></div>
                    <form>
                    <div className="user">First name
                                     <Input
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                                name="firstName"
                                placeholder="First Name (required)"
                            /></div>
                            <div className="user">Last name
                                     <Input
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                                name="lastName"
                                placeholder="Last Name (required)"
                            /></div>
                        <div className="user">Username
                                     <Input
                                value={this.state.login}
                                onChange={this.handleInputChange}
                                name="login"
                                placeholder="username (required)"
                            /></div>
                            <div className="user">Email
                                     <Input
                                     type="email"
                                value={this.state.login}
                                onChange={this.handleInputChange}
                                name="email"
                                placeholder="Email (required)"
                            /></div>
                        <div className="password">Password
                                     <Input
                                type="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                placeholder="password(required)"
                            /></div>
                        <div className="buttonContainer">
                        <Link to="/">
                            <FormBtn
                                disabled={!(this.state.firstName && this.state.lastName)}
                                onClick={this.handleFormSubmit}
                            >Sign Up</FormBtn>
                            </Link>
                            {/* </div> */}
                        </div>
                    </form>
                </div>
            </div>
            //             </Col>
            //             <Col size="md-4">
            //             </Col>
            //         </Row>
            //     </Container>
            // </Container>
        )
    }
};

export default signup;