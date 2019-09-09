import React from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom'

class Nav extends React.Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }

        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/myfridge">Friendly Fridge</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {loggedIn ? (
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/myfridge">My Fridge</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/additem">Add Food</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={this.logout}>Logout</a>
                            </li>
                        </ul>
                    ) : (
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/login">Login <span className="sr-only">(current)</span></a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="/signup">Sign Up</a>
                                </li>
                            </ul>
                        )}
                </div>
            </nav>
        );
    }
}

export default Nav;