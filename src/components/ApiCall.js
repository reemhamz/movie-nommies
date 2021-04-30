import React, { useEffect, useState } from "react";
import axios from "axios";
import firebase from "./FirebaseCall";
import "firebase/database";

// importing ticket icon
import { Ticket, Info } from "phosphor-react";

function ApiCall(props) {
  // Component states
  const [movieList, setMovieList] = useState([]);

  // API dependencies
  const apiKey = "43090bb1";
  const dataUrl = `http://www.omdbapi.com/?s=&apikey=${apiKey}&`;
  const posterUrl = `http://img.omdbapi.com/?s=apikey=${apiKey}&`;
  const dbRef = firebase.database().ref();
  // HTTPS request to API (OMDB)
  useEffect(() => {
    axios({
      method: "GET",
      url: dataUrl,
      params: {
        s: props.movieSearchProp,
      },
    })
      .then((res) => {
        console.log(res);
        setMovieList(res.data.Search);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.movieSearchProp]);

  const nominateMovie = (movieID) => {
    console.log(movieID);
    dbRef.push({
      movieName: movieID.Title,
      year: movieID.Year,
    });
  };

  return (
    <div className="ApiCall">
      <div className="moviesResult">
        <ul className="moviesResultList">
          {movieList !== undefined &&
            movieList.map((movieInfo, index) => {
              if (movieInfo.Type === "movie" && movieInfo.Poster !== "N/A") {
                return (
                  <li className="moviesResultListItem" key={index}>
                    <div className="moviePoster">
                      <img
                        src={movieInfo.Poster}
                        alt={`Poster of the movie ${movieInfo.Title} from the year ${movieInfo.Year}`}
                      />
                    </div>
                    <div className="movieInfo">
                      <div className="movieTitle">
                        <h3>{movieInfo.Title}</h3>
                      </div>
                        <div className="movieYear">
                          <span>Year:</span>
                          <h4>{ movieInfo.Year}</h4>
                      </div>
                      <div className="movieButtons">
                        <button
                          onClick={() => nominateMovie(movieInfo)}
                          aria-label="nominate movie"
                        >
                          <Ticket size={30} />
                        </button>
                        <button aria-label="view movie information">
                          <Info size={30} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              }
            })}
        </ul>
      </div>
    </div>
  );
}

export default ApiCall;
