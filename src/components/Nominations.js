import React, { useEffect, useState } from "react";

// importing Firebase to be used for modal
import firebase from "./FirebaseCall";
import "firebase/database";

// importing icons
import { Info, Trash, XSquare } from "phosphor-react";

// importing stuff for animation
import { StyleRoot } from "radium";
import { animationStyles } from "./animationConfig";

// importing stock image for missing movie posters
import StockPoster from "../assets/stockPhoto.jpg";

function Nominations() {
  // firebase reference
  const dbRef = firebase.database().ref();

  // state variables
  const [nominies, setNominies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toggleBanner, setToggleBanner] = useState(false);

  // toggle modal to open and close
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // remove movie from nomination list
  const removeMovie = (movieID) => {
    dbRef.child(movieID).remove();
  };

  useEffect(() => {
    // variable holding reference to our database hosted on Firebase
    dbRef.on("value", (response) => {
      const movieData = response.val();
      const dataArray = [];
      for (let key in movieData) {
        dataArray.push({ key: key, info: movieData[key] });
      }
      setNominies(dataArray);

      // displays banner when the maximum of 5 movies have been selected
      dataArray.length === 5 && setToggleBanner(false);

      dataArray.length === 0 && setModalOpen(false);
    });
  }, []);

  useEffect(() => {
    // opens modal whenever a new movie has been nominated
    dbRef.on("child_added", () => {
      toggleModal();
    });
  }, []);

  return (
    <div className="Nominations">
      {nominies.length === 5 && (
        <div class="banner">
          <span>
            You've reached the max amount of movies! Go into the nominations
            list and delete a movie to nominate another.
          </span>
        </div>
      )}
      <button onClick={toggleModal} className="nominationsToggle">
        {!modalOpen ? <> View movie list</> : <> Close movie list</>}
      </button>

      <StyleRoot>
        {modalOpen && (
          <ul className="nominationsList" style={animationStyles.slideInRight}>
            <button class="closeButton">
              <XSquare
                size={48}
                color="white"
                onClick={() => setModalOpen(false)}
              />
            </button>
            {nominies.length >= 1 &&
              nominies.map((nominie, index) => {
                return (
                  <li
                    className=" nommiesListItem"
                    key={index}
                    style={animationStyles.fadeInUpFast}
                  >
                    <div className="moviePoster">
                      {nominie.info.poster !== "N/A" ? (
                        <img
                          src={nominie.info.poster}
                          alt={`Poster of the movie ${nominie.info.movieTitle} from the year ${nominie.info.year}`}
                        />
                      ) : (
                        <img
                          src={StockPoster}
                          alt={`Poster of the movie ${nominie.info.movieTitle} from the year ${nominie.info.year}`}
                        />
                      )}
                    </div>
                    <div className="movieInfo">
                      <div className="movieTitle">
                        <h3>{nominie.info.movieName}</h3>
                      </div>
                      <div className="movieYear">
                        <span>Year:</span>
                        <h4>{nominie.info.year}</h4>
                      </div>
                      <div className="movieButtons">
                        <button
                          onClick={() => removeMovie(nominie.key)}
                          aria-label="remove movie from nominations"
                        >
                          <Trash size={30} />
                        </button>

                        <a
                          href={`https://imdb.com/title/${nominie.info.imdbID}`}
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
              })}
          </ul>
        )}
      </StyleRoot>
    </div>
  );
}

export default Nominations;
