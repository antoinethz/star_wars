import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

function Search() {
  const { username, password, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState("all");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/search`, {
        params: {
          query: query,
          type: searchType,
        },
        auth: {
          username: username,
          password: password,
        },
      });
      setResults(response.data);
      navigate(`/search/${query}`, {
        state: response.data,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a character"
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="all">All</option>
        <option value="people">Characters</option>
        <option value="starships">Starships</option>
        <option value="planets">Planets</option>
        <option value="vehicles">Vehicles</option>
        <option value="species">Species</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
