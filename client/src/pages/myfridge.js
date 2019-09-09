import React, { Component } from "react";
import { Container, Row, Col } from "../Components/Grid";
import { List, ListItem } from "../Components/List";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; import DeleteBtn from "../Components/DeleteBtn";
import API from "../utils/API";
import AddFoodBtn from "../Components/AddFoodBtn";
import "./myfridge.css";
import moment from "moment";
import axios from "axios";
import camera from "./camera.js";


class myfridge extends Component {

    state = {
        foods: [],
        name: " ",
        expiration: " "
    }

    componentDidMount() {
        this.loadFoods();
        this.checkExpiration();
    }

    loadFoods = () => {
        API.getFoods()
            .then(res => {
                console.log("Get foods");
                console.log(res);
                this.setState({ foods: res.data, name: "", expiration: "" })
            }
            )
            .catch(err => console.log(err));
    };

    deleteFood = id => {
        API.deleteFood(id)
            .then(res => this.loadFoods())
            .catch(err => console.log(err));
    };

    checkExpiration = (expirationDate) => {
        console.log("MOMENT JS");
        var today = moment(new Date(), 'MM/DD/YYYY').format("MM/DD/YYYY");
        var expiredDate = moment(expirationDate, 'YYYY-MM-DD').format("MM/DD/YYYY");

        console.log("TODAY: ");
        console.log(today);
        console.log("EXPIRED DATE: ");
        console.log(expiredDate);

        var isExpired = moment(today, 'MM/DD/YYYY').isAfter(expiredDate);
        var expiredClass = "fresh";
        console.log("isExpired?");
        console.log(isExpired);

        console.log("Testing 2 day expiration");
        console.log(moment(today, 'MM/DD/YYYY').diff(expiredDate, "days"));

        if (!isExpired) {
            if (moment(today, 'MM/DD/YYYY').diff(expiredDate, "days") >= -2) {
                console.log("warning")
                expiredClass = "warning";
            }
        } else if (moment(today, 'MM/DD/YYYY').diff(expiredDate, "days") >= 0) {
            console.log("expired")
            expiredClass = "expired";

        } else {
            expiredClass = "fresh";
        }

        return expiredClass;
    }


    render() {
    

        return (
            <div className="outer-fridge">
                <h3 className="title-style">Your Fridge</h3>
                {this.state.foods.length ? (
                    <List>
                        {this.state.foods.map(food => (
                            <ListItem key={food._id}>
                                <span className={this.checkExpiration(food.expirationDate, "MM/DD/YYYY")}>
                                    {food.foodItem}</span>
                                <button onClick={() => this.deleteFood(food._id)}>X</button>
                                {/* <DeleteBtn onClick={this.deleteFood(food._id)} /> */}

                            </ListItem>
                        ))}
                    </List>
                ) : (
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
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

//here deletething

export default myfridge;