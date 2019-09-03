import React, { Component } from "react";
import { Input, FormBtn } from "../components/Form";


class login extends Component {
    state = {
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
    }

    render() {
        return (
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
        )
    }

};

export default login;