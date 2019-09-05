import React, { Component } from "react";
import { Input, FormBtn, } from "../Components/Form";
import axios from 'axios';
// import { Container, Row, Col } from "../Components/Grid";
import "./login.css";
import Img from "../Components/images/jakub-kapusnak-vnNFWKY7Tj4-unsplash.jpg";
import { Link } from "react-router-dom";

class login extends Component {
    state = {
        email: "",
        password: ""
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
                        <div className="user">Email
                                     <Input
                                     type="email"
                                value={this.state.login}
                                onChange={this.handleInputChange}
                                name="email"
                                placeholder="email (required)"
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
                            <FormBtn
                                disabled={!(this.state.login && this.state.password)}
                                onClick={this.handleFormSubmit}
                            >Login</FormBtn>
                            {/* <div className="sign-up"> */}
                            <Link to="/signup">
                            <FormBtn>
                                Sign Up
                            </FormBtn>
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

export default login;