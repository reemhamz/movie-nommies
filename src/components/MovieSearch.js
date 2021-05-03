import React, { useState } from "react";
import ApiCall from "./ApiCall";

function MovieSearch() {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="MovieSearch">
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="movieSearch" className="visuallyHidden">
          Search for a movie
        </label>
        <input
          type="text"
          id="movieSearch"
          placeholder="🔍 Search for a movie..."
          onChange={handleChange}
        />
      </form>
      <ApiCall movieSearchProp={searchInput} />
    </div>
  );
}

export default MovieSearch;
