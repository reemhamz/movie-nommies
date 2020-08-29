import React, { useEffect, useState } from "react";
import "./styles/App.scss";

import ApiCall from "./components/ApiCall";
import MovieSearch from "./components/MovieSearch";

function App() {
  return (
    <div className="App">
      <h1> Nominate 5 movies ~ 🎥✨</h1>
      <MovieSearch />
      <ApiCall />
    </div>
  );
}

export default App;
