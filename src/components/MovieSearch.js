import React, { useEffect, useState } from "react";
import ApiCall from "./ApiCall";

function MovieSearch() {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="MovieSearch">
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="movieSearch" class="visuallyHidden">
          Search for a movie
        </label>
        <input
          type="text"
          id="movieSearch"
          placeholder="Search for a movie..."
          onChange={() => handleChange}
        />
        <button type="submit">
          <span role="img" aria-label="action">
            🎬
          </span>
        </button>
      </form>
      <ApiCall searchMovieProp={searchInput} />
    </div>
  );
}

export default MovieSearch;
