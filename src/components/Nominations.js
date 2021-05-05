import React, { useEffect, useState, useContext } from "react";

// importing Firebase to be used for modal
import firebase from "./FirebaseCall";
import "firebase/database";

// importing context for state management
import { NominationContext } from "./context/NominationContext";

// importing icons
import { Info, Trash } from "phosphor-react";
// importing React Modal package for better accessibility in modal code
import Modal from "react-modal";

// React Modal styles
const customStyles = {
  content: {
    top: "0",
    // left: "0",
    right: "0",
    width: "40%",
  },
};
Modal.setAppElement("#root");

function Nominations() {
  const dbRef = firebase.database().ref();

  const [nominies, setNominies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toggleBanner, setToggleBanner] = useState(false);

  const { nominationArray, setNominationArray } = useContext(NominationContext);

  // toggle modal to open
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // remove movie from nomination list
  const removeMovie = (movieID) => {
    dbRef.child(movieID).remove();
  };

  // set nomination list limit

  useEffect(() => {
    // variable holding reference to our database hosted on Firebase

    dbRef.on("value", (response) => {
      const movieData = response.val();
      const dataArray = [];
      for (let key in movieData) {
        dataArray.push({ key: key, info: movieData[key] });
      }
      setNominies(dataArray);
      console.log(dataArray);
      dataArray.length === 5 && setToggleBanner(true);
    });
  }, []);

  useEffect(() => {
    dbRef.on("child_added", () => {
      toggleModal();
    });
  }, []);

  return (
    <div className="Nominations">
      {toggleBanner && (
        <div>
          <h1>you've reached the max amount of movies</h1>
        </div>
      )}
      <button onClick={toggleModal} class="nominationsToggle">open modal</button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
        // className="Modal"
        // overlayClassName="modalOverlay"
      >
        <ul className="nominationsList">
          {nominies.length > 0 &&
            nominies.map((nominie, index) => {
              return (
                <li className=" nommiesListItem" key={index}>
                  <div className="moviePoster">
                    <img
                      src={nominie.info.poster}
                      alt={`Poster of the movie ${nominie.info.Title} from the year ${nominie.info.year}`}
                    />
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
      </Modal>
    </div>
  );
}

export default Nominations;
