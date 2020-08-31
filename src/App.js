import React, { useEffect, useState } from "react";
import "./styles/App.scss";

import Header from "./components/Header";
import MovieSearch from "./components/MovieSearch";

function App() {
  return (
    <div className="App">
      <Header />
      <MovieSearch />
    </div>
  );
}

export default App;
