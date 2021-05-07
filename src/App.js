import React from "react";
import "./styles/App.scss";

import Hero from "./components/Hero";
import Nominations from "./components/Nominations";
import MovieSearch from "./components/MovieSearch";
import Footer from "./components/Footer";
import NominationsContextProvider from "./components/context/NominationsContext";

function App() {
  return (
    <div className="App wrapper">
      <NominationsContextProvider>
        <Hero />
        <main>
          <Nominations />
          <MovieSearch />
        </main>
        <Footer />
      </NominationsContextProvider>
    </div>
  );
}

export default App;
