import React from "react";
import "./style.css";

function AddFoodBtn(props) {
  return (
    <span className="addFood-btn fa fa-plus" {...props} role="button" tabIndex="0">
      Add Food
    </span>
  );
}

export default AddFoodBtn;
