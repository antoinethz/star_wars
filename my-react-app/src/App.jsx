import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";
import Search from "./Search";
import styles from "./App.module.css";

import FichePeople from "./fiches/FichePeople";
import FicheSpecies from "./fiches/FicheSpecies";
import FichePlanets from "./fiches/FichePlanets";
import FicheStarships from "./fiches/FicheStarships";
import FicheVehicles from "./fiches/FicheVehicles";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className={styles.container}>
        <h1 className={styles.title}>Star Wars Rebels Search</h1>
        {!isAuthenticated ? (
          <Login></Login>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Search />}
            />
            <Route
              path="/search/:query?"
              element={<Search />}
            />
            <Route
              path="/people/:name"
              element={<FichePeople />}
            />
            <Route
              path="/planets/:name"
              element={<FichePlanets />}
            />
            <Route
              path="/species/:name"
              element={<FicheSpecies />}
            />
            <Route
              path="/starships/:name"
              element={<FicheStarships />}
            />
            <Route
              path="/vehicles/:name"
              element={<FicheVehicles />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;

