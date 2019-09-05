import React, { Component } from "react";
import { Container, Row, Col } from "../Components/Grid";
import { List, ListItem } from "../Components/List";
import { Link } from "react-router-dom";
import DeleteBtn from "../Components/DeleteBtn";
import API from "../utils/API";
import AddFoodBtn from "../Components/AddFoodBtn";

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
            <Container>
                <h3>Your Fridge</h3>
                <Container>
                    {this.state.foods.length ? (
                        <List>
                            {this.state.foods.map(food => (
                                <ListItem key={food._id}>
                                    <DeleteBtn onClick={() => this.deleteFood(food._id)} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <h3>There is nothing in your fridge</h3>
                        )}
                </Container>
                <Link to="/camera" >
                <AddFoodBtn/>
                </Link>
            </Container>
        )
    }
}

export default myfridge;