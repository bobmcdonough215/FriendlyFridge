import React, { Component } from "react";
import { Container, Row, Col } from "../Components/Grid";
import { List, ListItem } from "../Components/List";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";import DeleteBtn from "../Components/DeleteBtn";
import API from "../utils/API";
import AddFoodBtn from "../Components/AddFoodBtn";
import "./myfridge.css";

class myfridge extends Component {

    state = {
        foods: [],
        name: " ",
        expiration: " "
    }

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
    };

    render() {
        return (
            <div className="outer-fridge">
                <h3 className="title-style">Your Fridge</h3>
                    {this.state.foods.length ? (
                        <List>
                            {this.state.foods.map(food => (
                                <ListItem key={food._id}>
                                    <DeleteBtn onClick={() => this.deleteFood(food._id)} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="card">
                                        <div class="card-header">
                                            <h3>Your fridge is empty!</h3>
                                            <ul id="fridge-foods"></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                <Link to="/camera" >
                    <div className="button">
                    <AddFoodBtn />
                    </div>
                </Link>
            </div>
        )
    }
}

export default myfridge;