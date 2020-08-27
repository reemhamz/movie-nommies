import React, { useEffect, useState } from "react";
import "./styles/App.scss";

import ApiCall from "./components/ApiCall";

function App() {
  return (
    <div className="App">
      <h1> Nominate 5 movies ~ 🎥✨</h1>
      <ApiCall />
    </div>
  );
}

export default App;
