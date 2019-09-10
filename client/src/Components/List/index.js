import React from "react";
import "./style.css";


const liStyle = {
  display: 'inline',
  "background-color": 'transparent',
  border: 'transparent',
  
};

const ulStyle = {
  display: 'inline',
  "background-color": 'transparent',
  border: 'transparent',
  
};

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul style={ulStyle}  className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li style={liStyle} className="list-group-item">{children}</li>;
}
 
// export function List({ children }) {
//   return (
//   <div className="row"></div>
//   );
// }

// export function ListItem({ children }) {
//   return <div className="col">{children}</div>;
// }