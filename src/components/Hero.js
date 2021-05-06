import React from "react";

// importing icons
import { Ticket, Info, Trash } from "phosphor-react";

function Hero() {
  return (
    <div className="Hero">
      <header className="heroTitles">
        <div className="headings">
          <h1>
            <span className="tinyHeader">The</span>
            <span className="largeHeader">
              Movie
              <br />
              Nommies
            </span>
          </h1>
          <h2>
            Nominate movies using the{" "}
            <span aria-label="ticket">
              <Ticket size={20} />
            </span>{" "}
            icon. View movie's IMDB page using the{" "}
            <span aria-label="information">
              <Info size={20} />
            </span>{" "}
            icon. In the nomination list, click the{" "}
            <span aria-label="trash">
              <Trash size={20} />
            </span>{" "}
            icon to remove a movie. You can only nominate 5 movies at a time.
            Make 'em count! <span aria-hidden="true">🤞🏼</span>
          </h2>
        </div>
        <div className="heroImage"></div>
      </header>
    </div>
  );
}

export default Hero;
