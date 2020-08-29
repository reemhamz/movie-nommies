import React, { useEffect, useState } from "react";
import axios from "axios";
import {OMDBKey} from "../config"

import movieSearch from "./MovieSearch";
function ApiCall(props) {
  console.log(props)
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
  const kaka = props.searchMovieProp; 



  // HTTPS request to API (OMDB)
  useEffect(() => {
    axios({
      method: "GET",
      url: dataUrl,
      params: {
        s: kaka,
      },
    })
      .then((res) => {
        setMovieList(res.data.Search);
        res.data.Search.map((movieInfo) => {
          if (movieInfo.Type === "movie") {
            
            setMovieTitle(movieInfo.Title);
            setMovieYear(movieInfo.Year);
            setMoviePoster(movieInfo.Poster);
          }
        });
      })
      .catch((err) => {
        console.log("You've encountered a problem!");
      });
  }, []);

  return (
    <div className="ApiCall">
      <ul>
        {movieList.map(data => {
          return (
            <li>{data.Title} ({data.Year})</li>
          )
        })}
      </ul>
    </div>
  );
}

export default ApiCall;
