import React from "react";
import "./style.css";

function DeleteBtn(props) {
  return (
    <span className="delete-btn" onClick={() => props.onClick} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export default DeleteBtn;
