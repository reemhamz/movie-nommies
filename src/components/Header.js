import React from "react";

function Header() {
  return (
    <div className="Header">
      <h1>
        <span className="tinyHeader">The</span>
        <span className="largeHeader">
          Movie
          <br />
          Nommies
        </span>
      </h1>
      <div className="headerImage"></div>
    </div>
  );
}

export default Header;
