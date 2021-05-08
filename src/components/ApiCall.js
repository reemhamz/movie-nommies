import React, { useEffect, useState, useContext } from "react";

// importing react context provider
import { NominationsContext } from "./context/NominationsContext";

// importing axios for API call
import axios from "axios";

// importing icons
import { Ticket, Info } from "phosphor-react";

// importing stuff for animation
import { StyleRoot } from "radium";
import { animationStyles } from "./AnimationConfig";

// importing stock image for missing movie posters
import StockPoster from "../assets/stockPhoto.jpg";

function ApiCall(props) {
  
  // Component states
  const [movieList, setMovieList] = useState([]);
  // const [movieStorage, setMovieStorage] = useState([]);

  // defining context so we can use it in this file
  const { nominations, setNominations } = useContext(NominationsContext);

  // API dependencies
  const apiKey = "43090bb1";
  const dataUrl = `https://www.omdbapi.com/?s=&apikey=${apiKey}&`;

  useEffect(() => {
    // HTTPS request to API (OMDB)
    axios({
      method: "GET",
      url: dataUrl,
      params: {
        s: props.movieSearchProp,
      },
    })
      .then((res) => {
        setMovieList(res.data.Search);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.movieSearchProp]);

  // function that adds movies into our localstorage depending on the movie we select
  const nominateMovie = (movieID) => {
    // adding the movie into our localstorage
    const movieStorage = localStorage.getItem("nominations");
    const currentNominations =
      movieStorage !== null ? JSON.parse(movieStorage) : [];

    // what to push into the local storage
    const newNomination = {
      movieName: movieID.Title,
      year: movieID.Year,
      poster: movieID.Poster,
      imdbID: movieID.imdbID,
    };

    //pushing our new nomination into datastorage
    currentNominations.push(newNomination);
    localStorage.setItem("nominations", JSON.stringify(currentNominations));

    setNominations(JSON.parse(localStorage.getItem("nominations")));
  };

  useEffect(() => {
    const data = localStorage.getItem("nominations");
    if (data) {
      setNominations(JSON.parse(data));
    }
  }, []);

  return (
    <div className="ApiCall">
      <div className="moviesResult">
        <StyleRoot>
          <ul className="moviesResultList">
            {movieList !== undefined &&
              movieList.map((movieInfo, index) => {
                if (movieInfo.Type === "movie") {
                  return (
                    <li
                      className="moviesResultListItem"
                      key={index}
                      style={animationStyles.fadeInUpSlow}
                    >
                      <div className="moviePoster">
                        {movieInfo.Poster !== "N/A" ? (
                          <img
                            src={movieInfo.Poster}
                            alt={`Poster of the movie ${movieInfo.Title} from the year ${movieInfo.Year}`}
                          />
                        ) : (
                          <img
                            src={StockPoster}
                            alt={`Poster of the movie ${movieInfo.Title} from the year ${movieInfo.Year}`}
                          />
                        )}
                      </div>
                      <div className="movieInfo">
                        <div className="movieTitle">
                          <h3>{movieInfo.Title}</h3>
                        </div>
                        <div className="movieYear">
                          <span>Year:</span>
                          <h4>{movieInfo.Year}</h4>
                        </div>
                        <div className="movieButtons">
                          <button
                            onClick={() => nominateMovie(movieInfo)}
                            aria-label="nominate movie"
                            disabled={
                              nominations.length === 5 ||
                              // button disables if the nominations array already includes the movie we selected
                              nominations.includes(
                                nominations.find(
                                  (nomination) =>
                                    nomination.imdbID === movieInfo.imdbID
                                )
                              )
                            }
                          >
                            <Ticket size={30} />
                          </button>
                          <a
                            href={`https://imdb.com/title/${movieInfo.imdbID}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="view movie information"
                          >
                            <Info size={30} />
                          </a>
                        </div>
                      </div>
                    </li>
                  );
                }
              })}
          </ul>
        </StyleRoot>
      </div>
    </div>
  );
}

export default ApiCall;
