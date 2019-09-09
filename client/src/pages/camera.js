import React, { Component } from "react";
import { Input, FormBtn } from "../Components/Form";
import { Container, Row, Col } from "../Components/Grid";
import API from "../utils/API";
import DeleteBTN from "../Components/DeleteBtn";
import { List, ListItem } from "../Components/List";
import moment from "moment";
import { format } from 'date-fns';
import "./camera.css";
import axios from "axios";

class camera extends Component {

    state = {
        foods: [],
        name: "",
        expiration: "",
        apiResults: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    loadFoods = () => {
        API.getFoods()
            .then(res =>
                this.setState({ foods: res.data, name: "", expiration: "" })
            )
            .catch(err => console.log(err));
    };

    deleteFood = id => {
        API.deleteFood(id)
            .then(res => this.loadFoods())
            .catch(err => console.log(err));
    }

    handleFormSubmit = event => {

        event.preventDefault();

        console.log(this.state.name)
        this.setState({
            name: this.state.name,
            expiration: this.state.expiration
        })
        this.searchQuery();
    };

    searchQuery = () => {
        var client_id = "617067ee1427bd2e414f93b20dea3be2fe336cf4c26a62963e8ddd9040044edb";

        // url
        var url = 'https://api.unsplash.com/search/photos?query=' + this.state.name

        // var for food item
        var expiration = this.state.expiration

        var site = url + "&client_id=" + client_id;
        console.log(site);

        axios
            .get(site)
            .then(res =>
                this.setState({ apiResults: res.data.results[0].urls.thumb }, () => this.saveDB()))
            .catch(err => console.log(err))
        // console.log(res.data.results[0].urls.thumb
    }

    saveDB = () => {

        console.log("Food: " + this.state.name);
        console.log("Expiration: " + this.state.expiration);
        console.log("URL: " + JSON.stringify(this.state.apiResults));
        API.saveFood({
            foodItem: this.state.name,
            expirationDate: this.state.expiration,
            foodurl: this.state.apiResults
        })
            .then(res => {
                console.log(res)
            })
            .catch(err =>
                console.log(err))
    }

    render() {
        return (
            <Container fluid>
                <Container>
                    <Row>
                        <Col size="md-6">
                            <div className="text-container">
                                <form>
                                    <div>Input item information here:</div>
                                    <Input
                                        type="text"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                        name="name"
                                        placeholder="food item (required)"
                                    />
                                    <div>Expiration Date:</div>
                                    <Input
                                        type="date"
                                        value={this.state.expiration}
                                        onChange={this.handleInputChange}
                                        name="expiration"
                                        placeholder="expiration (required)"
                                    />
                                    <FormBtn
                                        disabled={!(this.state.name && this.state.expiration)}
                                        onClick={this.handleFormSubmit}
                                    >Add Food</FormBtn>
                                </form>
                            </div>
                        </Col>
                        <Col size="md-6">
                            {this.state.foods.length ? (
                                <List>
                                    {this.state.foods.map(food => (
                                        <ListItem key={food._id}>
                                            <DeleteBTN onClick={() => this.deleteFood(food._id)} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                    <div className="results">
                                        <h3>No Results to Display</h3>
                                    </div>
                                )}
                        </Col>
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default camera;
