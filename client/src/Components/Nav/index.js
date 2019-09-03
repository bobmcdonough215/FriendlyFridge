import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Friendly Fridge
      </a>
      <li className="nav-item">
        <a className="nav-link" href="/myfridge">My Fridge</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/camera">Camera</a>
      </li>
    </nav>
  );
}

export default Nav;