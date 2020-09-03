import React, { useEffect, useState } from "react";
import axios from "axios";
import { OMDBKey } from "../config";

import movieSearch from "./MovieSearch";
function ApiCall(props) {

  // Component states
  const [movieList, setMovieList] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  // const [movieSearch, setMovieSearch] = useState(searchMovieProp)

  // API dependencies
  const apiKey = "43090bb1";
  const dataUrl = `http://www.omdbapi.com/?s=&apikey=${apiKey}&`;
  const posterUrl = `http://img.omdbapi.com/?s=apikey=${apiKey}&`;
  const movieSearch = "twilight";

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
        console.log(res)

        setMovieList(res.data.Search);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.movieSearchProp]);

  return (
    <div className="ApiCall">
      <div className="moviesResult">
        <ul className="moviesResultList">
          {movieList !== undefined &&
            movieList.map((movieInfo) => {
              
              
              if (movieInfo.Type === "movie" && movieInfo.Poster !== "N/A") {
                return (
                  <li className="moviesResultListItem ">
                    <div className="moviePoster">
                      <img
                        src={movieInfo.Poster}
                        alt={`Poster of the movie ${movieInfo.Title} from the year ${movieInfo.Year}`}
                      />
                      <div className="moviePosterYear">
                        <span>{movieInfo.Year}</span>
                      </div>
                    </div>

                    <div className="movieTitle">
                      <h2>{movieInfo.Title}</h2>
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
