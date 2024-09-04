import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import List from "./List";
import styles from "./Search.module.css";

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

  useEffect(() => {
    if (query.trim()) {
      const timeoutId = setTimeout(() => {
        handleSearch(query);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [query, searchType]);

  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
        <select
          className={styles.searchSelect}
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
      </div>
      <List></List>
    </div>
  );
}

export default Search;
