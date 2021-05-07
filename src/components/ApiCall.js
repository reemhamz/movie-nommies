import React, { useEffect, useState, useContext } from "react";

// importing react context provider
import { NominationsContext } from "./context/NominationsContext";

// importing axios for API call
import axios from "axios";

// importing firebase
import firebase from "./FirebaseCall";
import "firebase/database";

// importing icons
import { Ticket, Info, Copy } from "phosphor-react";

// importing stuff for animation
import { StyleRoot } from "radium";
import { animationStyles } from "./animationConfig";

// importing stock image for missing movie posters
import StockPoster from "../assets/stockPhoto.jpg";

function ApiCall(props) {
  // Component states
  const [movieList, setMovieList] = useState([]);
  const [movieStorage, setMovieStorage] = useState([]);

  // defining context so we can use it in this file
  const { nominations, setNominations } = useContext(NominationsContext);

  // API dependencies
  const apiKey = "43090bb1";
  const dataUrl = `https://www.omdbapi.com/?s=&apikey=${apiKey}&`;

  // firebase reference
  const dbRef = firebase.database().ref();

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

  const nominateMovie = (movieID) => {
    // push to firebase
    // dbRef.push({
    //   movieName: movieID.Title,
    //   year: movieID.Year,
    //   poster: movieID.Poster,
    //   imdbID: movieID.imdbID,
    // });

    // localStorage.setItem("nominations", JSON.stringify(movieID));
    const currentNominations =
      JSON.parse(localStorage.getItem("nominations")) || [];

    const newNomination = {
      movieName: movieID.Title,
      year: movieID.Year,
      poster: movieID.Poster,
      imdbID: movieID.imdbID,
    };

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

  useEffect(() => {
    dbRef.on("value", (response) => {
      const movieData = response.val();
      const movieArray = [];
      const movieIDArray = [];

      //
      for (let key in movieData) {
        movieArray.push({ key: key, info: movieData[key] });
      }
      nominations.map((movie) => movieIDArray.push(movie.imdbID));
      console.log(movieArray)
      // using localstorage to save nominated movies
      localStorage.setItem("nominations", JSON.stringify(movieArray));
    });
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
                              nominations.includes(movieInfo.imdbID) ||
                              nominations.length >= 5
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
