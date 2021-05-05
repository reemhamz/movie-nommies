import React, { useEffect, useState, useContext } from "react";

// importing axios for API call
import axios from "axios";

// importing firebase
import firebase from "./FirebaseCall";
import "firebase/database";

// importing context for state management
import { NominationContext } from "./context/NominationContext";

// importing icons
import { Ticket, Info } from "phosphor-react";

function ApiCall(props) {
  // Component states
  const [movieList, setMovieList] = useState([]);
  const { nominationArray, setNominationArray } = useContext(NominationContext);
  
  // const [disableButton, setDisableButton] = useState(false)
  // API dependencies
  const apiKey = "43090bb1";
  const dataUrl = `http://www.omdbapi.com/?s=&apikey=${apiKey}&`;
  const posterUrl = `http://img.omdbapi.com/?s=apikey=${apiKey}&`;
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
      dbRef.push({
        movieName: movieID.Title,
        year: movieID.Year,
        poster: movieID.Poster,
        imdbID: movieID.imdbID,
      });
      // setNominationArray("you set me str8!")
  
    };

  useEffect(() => {
        dbRef.on("value", (response) => {
          const movieData = response.val();
          const movieArray = [];
          for (let key in movieData) {
            movieArray.push({ key: key, info: movieData[key] });
          }
          setNominationArray(movieArray);
        });
  }, [])

  console.log("THIS IS THE CXONTEXT!!1",nominationArray);

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
                        <h4>{movieInfo.Year}</h4>
                      </div>
                      <div className="movieButtons">
                        <button
                          onClick={() => nominateMovie(movieInfo)}
                          aria-label="nominate movie"
                          // disabled={disableButton}
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
      </div>
    </div>
  );
}

export default ApiCall;
