import React, { useEffect, useState } from "react";
import firebase from "firebase";

function Nominations() {
  const [nominies, setNominies] = useState([]);
}

useEffect(() => {
    // variable holding reference to our database hosted on Firebase
    const dataBasePoint = firebase.database().ref();

    dataBasePoint.on('value', (response) => {
        console.log(response.val());
    })
})

return (
  <div className="Nominations">
      
  </div>
);

export default Nominations;
