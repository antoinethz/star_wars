import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Fiche.module.css";
import Back from "../Back";

const FichePlanets = () => {
  const location = useLocation();
  const result = location.state;

  return (
    <div className={styles.fiche}>
      <h2 className={styles.heading}>{result.name}</h2>
      <div className={styles.details}>
        <p>
          <strong>Diameter:</strong> {result.diameter} km
        </p>
        <p>
          <strong>Rotation Period:</strong> {result.rotation_period} hours
        </p>
        <p>
          <strong>Orbital Period:</strong> {result.orbital_period} days
        </p>
        <p>
          <strong>Gravity:</strong> {result.gravity} G
        </p>
        <p>
          <strong>Population:</strong> {result.population}
        </p>
        <p>
          <strong>Climate:</strong> {result.climate}
        </p>
        <p>
          <strong>Terrain:</strong> {result.terrain}
        </p>
        <p>
          <strong>Surface Water:</strong> {result.surface_water}%
        </p>
      </div>
      <Back />
    </div>
  );
};

export default FichePlanets;
