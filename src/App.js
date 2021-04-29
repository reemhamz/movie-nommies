import React from "react";
import "./styles/App.scss";

import Header from "./components/Header";
import MovieSearch from "./components/MovieSearch";
import Nominations from "./components/Nominations";

function App() {
  return (
    <div className="App wrapper">
      <Header />
      <MovieSearch />
      <Nominations />
    </div>
  );
}

export default App;
