import React, { useEffect, useState } from "react";
import axios from "axios";
import { OMDBKey } from "../config.js";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");

  // API dependencies
  const apiKey = OMDBKey;
  const dataUrl = `http://www.omdbapi.com/?s=&apikey=${apiKey}&`;
  const posterUrl = `http://img.omdbapi.com/?apikey=${apiKey}&`;
  const movieSearch = "harry potter";

  // HTTPS request to API (OMDB)
  useEffect(() => {
    axios({
      method: "GET",
      url: dataUrl,
      params: {
        // t: movieTitle,
        s: movieSearch,
      },
    }).then((res) => {
      setMovieList(res.data.Search);
    });
  }, []);

  return (
    <div className="App">
      <ul>
        {movieList.map((data) => {
          return <li>{data.Title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
