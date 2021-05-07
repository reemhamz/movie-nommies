import React, { useEffect, useState, useContext } from "react";

// importing react context provider
import { NominationsContext } from "./context/NominationsContext";

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

  // Component states
  const [nominies, setNominies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toggleBanner, setToggleBanner] = useState(false);

  // defining context so we can use it in this file
  const { nominations, setNominations } = useContext(NominationsContext);
  // toggle modal to open and close
  
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // remove movie from nomination list
  const removeMovie = (movieID) => {
    // dbRef.child(movieID).remove();
    localStorage.removeItem("nominations", JSON.stringify(movieID));
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
      nominations.length === 5 && setToggleBanner(false);

      nominations.length === 0 && setModalOpen(false);
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
      {nominations.length === 5 && (
        <div className="banner">
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
            <button className="closeButton">
              <XSquare
                size={48}
                color="white"
                onClick={() => setModalOpen(false)}
              />
            </button>
            {nominations.length >= 1 &&
              nominations.map((nominie, index) => {
                // console.log(nominie)
                return (
                  <li
                    className=" nommiesListItem"
                    key={index}
                    style={animationStyles.fadeInUpFast}
                  >
                     <div className="moviePoster">
                      {nominie.poster !== "N/A" ? (
                        <img
                          src={nominie.poster}
                          alt={`Poster of the movie ${nominie.movieName} from the year ${nominie.year}`}
                        />
                      ) : (
                        <img
                          src={StockPoster}
                          alt={`Poster of the movie ${nominie.movieName} from the year ${nominie.year}`}
                        />
                      )}
                    </div>
                    <div className="movieInfo">
                      <div className="movieTitle">
                        <h3>{nominie.movieName}</h3>
                      </div>
                      <div className="movieYear">
                        <span>Year:</span>
                        <h4>{nominie.year}</h4>
                      </div>
                      <div className="movieButtons">
                        <button
                          onClick={() => removeMovie(nominie.imdbID)}
                          aria-label="remove movie from nominations"
                        >
                          <Trash size={30} />
                        </button>
                        <a
                          href={`https://imdb.com/title/${nominie.imdbID}`}
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
