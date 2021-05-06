import React from "react";
import { Ticket, Info } from "phosphor-react";
import MovieSearch from "./MovieSearch";

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
            Search up some movies and nominate using the{" "}
            <span aria-label="ticket">
              <Ticket size={20} />
            </span>{" "}
            icon. To view the movie's IMDB page, click the{" "}
            <span aria-label="information">
              <Info size={20} />
            </span>{" "}
            icon. You can only nominate 5 movies at a time. Make 'em count!{" "}
            <span aria-hidden="true">🤞🏼</span>
          </h2>
        </div>
        <div className="heroImage"></div>
      </header>
    </div>
  );
}

export default Hero;
