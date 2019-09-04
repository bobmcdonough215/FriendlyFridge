import React, { Component } from "react";
import { Input, FormBtn } from "../Components/Form";
import axios from 'axios'


class login extends Component {
    state = {
        email: " ",
        login: " ",
        password: " "
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
            email:this.state.email,
            username: this.state.login,
            password: this.state.password
        })
        .then(response => {
            console.log(response)
            if (response.data){
                console.log('sucessful signup')
                this.setState({
                    redirectTo: '/login'
                })
            }else{
                console.log('Sign-up error');
            }
        }).catch(error => {
            console.log('sign up server error: ')
            console.log(error);
        })
    }

    render() {
        return (
            <Container fluid>
                <Container>
                <Row>
                    <Col size="md-4">
                    </Col>
                    <Col size="md-4">
                <form>
                    <Input
                        value={this.state.login}
                        onChange={this.handleInputChange}
                        name="username"
                        placeholder="username (required)"
                    />
                    <Input
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name="password"
                        placeholder="password (required)"
                    />
                    <FormBtn
                        disabled={!(this.state.login && this.state.password)}
                        onClick={this.handleFormSubmit}
                    >Login</FormBtn>
                </form>
                </Col>
                <Col size="md-4">
                    </Col>
                </Row>
                </Container>
            </Container>
        )
    }
};

export default login;