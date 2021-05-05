import React, { createContext, useState } from "react";
import "./styles/App.scss";

import Hero from "./components/Hero";
import Nominations from "./components/Nominations";
import NominationContextProvider from "./components/context/NominationContext"
import MovieSearch from "./components/MovieSearch";
import ApiCall from "./components/ApiCall";

function App() {
  
  return (
    <div className="App wrapper">
      <NominationContextProvider>
        <Hero />
        <main>
          <MovieSearch />
          <Nominations />
        </main>
      </NominationContextProvider>
    </div>
  );
}

export default App;
