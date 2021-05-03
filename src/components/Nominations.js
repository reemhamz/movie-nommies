import React, { useEffect, useState } from "react";

// importing Firebase to be used for modal
import firebase from "./FirebaseCall";
import "firebase/database";

// importing icons
import { Ticket, Info } from "phosphor-react";
// importing React Modal package for better accessibility in modal code
import Modal from "react-modal";

// React Modal styles
const customStyles = {
  content: {
    top: "0",
    background: "red",
    // left: "50%",
    right: "0",
    // bottom: "auto",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
    // display: "flex",
  },
};
Modal.setAppElement("#root");
function Nominations() {

  const [nominies, setNominies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const removeMovie = () => {};

  useEffect(() => {
    // variable holding reference to our database hosted on Firebase
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      const dataArray = [];
      const movieData = response.val();
      for (let key in movieData) {
        dataArray.push({ key: key, info: movieData[key] });
      }
      setNominies(dataArray);
    });
  }, []);

  return (
    <div className="Nominations">
      <button onClick={toggleModal}>open modal</button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modalOverlay"
      >
        <ul className="nominationsList">
          {nominies.length > 0 &&
            nominies.map((nominie, index) => {
              console.log(nominie.info);
              return (
                <li
                  className="moviesResultListItem nominationsListItem"
                  key={index}
                >
                  <div className="moviePoster">
                    <img
                      src={nominie.info.poster}
                      alt={`Poster of the movie ${nominie.info.movieName} from the year ${nominie.info.year}`}
                    />
                  </div>
                  <div className="nominie">
                    <div className="movieTitle">
                      <h3>{nominie.info.movieName}</h3>
                    </div>
                    <div className="movieYear">
                      <span>Year:</span>
                      <h4>{nominie.info.year}</h4>
                    </div>
                    <div className="movieButtons">
                      <button
                        onClick={() => removeMovie(nominie)}
                        aria-label="nominate movie"
                      >
                        <Ticket size={30} />
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
