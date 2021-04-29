import React, { useEffect, useState } from "react";
import firebase from "./FirebaseCall"
import "firebase/database";

function Nominations() {
  const [nominies, setNominies] = useState([]);

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
},[]);

  return <div className="Nominations">
    <ul>
      {nominies.length > 0 && nominies.map(e => {
  console.log(e.info)
})}
  </ul>
</div>;
}


export default Nominations;
