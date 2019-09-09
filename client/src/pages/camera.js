import React, { Component } from "react";
import { Input, FormBtn } from "../Components/Form";
import { Container, Row, Col } from "../Components/Grid";
import API from "../utils/API";
import DeleteBTN from "../Components/DeleteBtn";
import { List, ListItem } from "../Components/List";
import moment from "moment";
import { format } from 'date-fns';
import "./camera.css";
import axios from "axios";

class camera extends Component {

    state = {
        foods: [],
        name: "",
        expiration: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    loadFoods = () => {
        API.getFoods()
            .then(res =>
                this.setState({ foods: res.data, name: "", expiration: "" })
            )
            .catch(err => console.log(err));
    };

    // deleteFood = id => {
    //     API.deleteFood(id)
    //         .then(res => this.loadFoods())
    //         .catch(err => console.log(err));
    // };

    handleFormSubmit = event => {

        event.preventDefault();
        //
       
        console.log(this)

        // access key
        var client_id = "617067ee1427bd2e414f93b20dea3be2fe336cf4c26a62963e8ddd9040044edb";
        // secret key
        var secretKey = "ba76a80016dc64cb68fce4bf48b073550ff881105ca90ce11ec323e7f765e439";
        // url
        var url = 'https://api.unsplash.com/search/photos?query=';

        // var for food item
        var item = this.state.name
        var expiration = this.state.expiration

        var site = url + item + "&client_id=" + client_id;
        console.log(site)


        // AXIOS KEY
        axios
            .get(site)
            .then(function (info) {

                console.log(info.data.results[0].urls.thumb)
                let foodURL = info.data.results[0].urls.thumb
            
        //
     //   if (this.state.name && this.state.expiration) {
            API.saveFood({
                foodItem: item,
                expirationDate: expiration,
                foodurl: foodURL


            })

                .then(res => {
                    console.log(res)
                })
                .catch(err => console.log(err));
       // }
    })

        // console.log(this.state.name, format(new Date(this.state.expiration), 'MM/dd/yyyy'), this.state.expiration);
        //console.log(moment(this.state.expiration, 'DD/MM/YYYY'));

        // var isExpired = moment(new Date(), 'DD/MM/YYYY').isBefore(this.state.expiration, 'DD/MM/YYYY');
        // console.log(isExpired);


        //console.log(moment(new Date(), 'DD/MM/YYYY').isBefore(this.state.expiration, 'DD/MM/YYYY'));
        // console.log(this.state.name, format(new Date(this.state.expiration), 'MM/dd/yyyy'), this.state.expiration);


        // console.log(moment(this.state.expiration, 'DD/MM/YYY'))
        // format(new Date(2014, 1, 11), 'YYYY-MM-dd')
        // if (this.state.name && this.state.expiration) {
        //     API.saveFood({
        //         name: this.state.name,
        //         expiration: this.state.expiration
        //     })
        //         .then(res => this.loadFoods())
        //         .catch(err => console.log(err));
        // }


        // console.log(moment(new Date(), 'DD/MM/YYYY').isBefore(this.state.expiration, 'DD/MM/YYYY'));


    };

    render() {
        return (
            <Container fluid>
                <Container>
                    <Row>
                        <Col size="md-6">
                            <div className="text-container">
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
                                        disabled={!(this.state.name && this.state.expiration)}
                                        onClick={this.handleFormSubmit}
                                    >Add Food</FormBtn>
                                </form>
                            </div>
                        </Col>
                        <Col size="md-6">
                            {this.state.foods.length ? (
                                <List>
                                    {this.state.foods.map(food => (
                                        <ListItem key={food._id}>
                                            <DeleteBTN onClick={() => this.deleteFood(food._id)} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                    <div className="results">
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

export default camera;
