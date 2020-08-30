import React, { useEffect, useState } from "react";
import axios from "axios";
import { OMDBKey } from "../config";

import movieSearch from "./MovieSearch";
function ApiCall(props) {
  console.log(props);

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
        console.log(res.data.Search);

        setMovieList(res.data.Search);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.movieSearchProp]);

  return (
    <div className="ApiCall">
      <ul>
        {movieList !== undefined &&
          movieList.map((movieInfo) => {
            console.log(movieInfo);
            if (movieInfo.Type === "series") {
              return (
                <li>
                  {movieInfo.Title} ({movieInfo.Year}) --> {movieInfo.Type}
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}

export default ApiCall;
