import React, { Component } from "react";
import { Container, Row, Col } from "../Components/Grid";
import { List, ListItem } from "../Components/List";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; import DeleteBtn from "../Components/DeleteBtn";
import API from "../utils/API";
import AddFoodBtn from "../Components/AddFoodBtn";
import "./myfridge.css";
import moment from "moment";
import axios from "axios";
import additem from "./additem.js";


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
        // access key
        var client_id = "617067ee1427bd2e414f93b20dea3be2fe336cf4c26a62963e8ddd9040044edb";
        // secret key
        var secretKey = "ba76a80016dc64cb68fce4bf48b073550ff881105ca90ce11ec323e7f765e439";
        // url
        var url = 'https://api.unsplash.com/search/photos?query=';

        // var for food item
        var item = this.state.name
        var expiration = this.state.expiration

        var site = url + item + "&client_id=" + client_id;
        console.log(site)


        //  AXIOS KEY
        axios
            .get(site)
            .then(function (info) {

                // console.log(info.data.results[0].urls.thumb)
                // let foodURL = info.data.results[0].urls.thumb

                //
                //   if (this.state.name && this.state.expiration) {
                API.saveFood({
                    foodItem: item,
                    expirationDate: expiration,
                    // foodurl: foodURL
                })

                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => console.log(err));
            })

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
                <Link to="/additem" >
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