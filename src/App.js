import React from "react";
import "./styles/App.scss";

import Hero from "./components/Hero";
import Nominations from "./components/Nominations";

function App() {
  return (
    <div className="App wrapper">
      <Hero />
      <main>
        <Nominations />
      </main>
    </div>
  );
}

export default App;
