import React, { useEffect, useState } from "react";
import axios from "axios";



function App() {
  const [movieList, setMovieList] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [moviePoster, setMoviePoster] = useState("");


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
        s: movieSearch,
      },
    })
      .then((res) => {
        res.data.Search.map((movieInfo) => {
          if (movieInfo.Type === "movie") {
            setMovieList(movieInfo);
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
    <div className="App">
      
    </div>
  );
}

export default App;
