import React, { createContext, useState } from "react";

// importing firebase
import firebase from "../FirebaseCall";
import "firebase/database";

// creating context object
export const NominationContext = createContext();
const dbRef = firebase.database().ref();


const NominationContextProvider = (props) => {

  const [nominationArray, setNominationArray] = useState([]);

  const updateNominations = () => {};

  return (
    <NominationContext.Provider value={{ nominationArray, setNominationArray }}>
      {props.children}
    </NominationContext.Provider>
  );
};

export default NominationContextProvider;
