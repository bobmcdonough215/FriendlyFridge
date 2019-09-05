import React, { Component } from "react";
import { Input, FormBtn } from "../Components/Form";
import { Container, Row, Col } from "../Components/Grid";
import API from "../utils/API";
import DeleteBTN from "../Components/DeleteBtn";
import { List, ListItem } from "../Components/List";
<<<<<<< HEAD
import moment from "moment";
// import { compareAsc, format } from 'date-fns'
=======
import { compareAsc, format } from 'date-fns'
import "./camera.css"
>>>>>>> 24bc529463f4c79b44b38c5d7147a58f5edf9657

class camera extends Component {

    state = {
        foods: [],
        name: "",
        expiration: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // loadFoods = () => {
    //     API.getFoods()
    //         .then(res =>
    //             this.setState({ foods: res.data, name: "", expiration: "" })
    //         )
    //         .catch(err => console.log(err));
    // };

    // deleteFood = id => {
    //     API.deleteFood(id)
    //         .then(res => this.loadFoods())
    //         .catch(err => console.log(err));
    // };

    handleFormSubmit = event => {
        event.preventDefault();
        // console.log(this.state.name, format(new Date(this.state.expiration), 'MM/dd/yyyy'), this.state.expiration);
        //console.log(moment(this.state.expiration, 'DD/MM/YYYY'));

        var isExpired = moment(new Date(), 'DD/MM/YYYY').isBefore(this.state.expiration, 'DD/MM/YYYY');
        console.log(isExpired);

       //console.log(moment(new Date(), 'DD/MM/YYYY').isBefore(this.state.expiration, 'DD/MM/YYYY'));
        if (this.state.name && this.state.expiration) {
            API.saveFood({
                foodItem: this.state.name,
                expirationDate: this.state.expiration
            })
            API.updateUseFridge({

            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => console.log(err));
        }

        console.log(this.state.name, format(new Date(this.state.expiration), 'MM/dd/yyyy'), this.state.expiration);
        // console.log(moment(this.state.expiration, 'DD/MM/YYY'))
        // format(new Date(2014, 1, 11), 'YYYY-MM-dd')
        // if (this.state.name && this.state.expiration) {
        //     API.saveFood({
        //         name: this.state.name,
        //         expiration: this.state.expiration
        //     })
        //         .then(res => this.loadFoods())
        //         .catch(err => console.log(err));
        // }

    };

    render() {
        return (
            <Container fluid>
                <Container>
                    <Row>
                        <Col size="md-6">
                            <div className="text-container">
                                <form>
                                    <div>Input item information here:</div>
                                    <Input
                                        type="text"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                        name="name"
                                        placeholder="food item (required)"
                                    />
                                    <div>Expiration Date:</div>
                                    <Input
                                        type="date"
                                        value={this.state.expiration}
                                        onChange={this.handleInputChange}
                                        name="expiration"
                                        placeholder="expiration (required)"
                                    />
                                    <FormBtn
                                        disabled={!(this.state.name && this.state.expiration)}
                                        onClick={this.handleFormSubmit}
                                    >Add Food</FormBtn>
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
                                    <h3>No Results to Display</h3>
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