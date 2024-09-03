import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Fiche.module.css";
import Back from "../Back";

const FicheSpecies = () => {
  const location = useLocation();
  const result = location.state;

  return (
    <div className={styles.fiche}>
      <h2 className={styles.heading}>{result.name}</h2>
      <div className={styles.details}>
        <p>
          <strong>Classification:</strong> {result.classification}
        </p>
        <p>
          <strong>Designation:</strong> {result.designation}
        </p>
        <p>
          <strong>Average Height:</strong> {result.average_height} cm
        </p>
        <p>
          <strong>Average Lifespan:</strong> {result.average_lifespan} years
        </p>
        <p>
          <strong>Eye Colors:</strong> {result.eye_colors}
        </p>
        <p>
          <strong>Hair Colors:</strong> {result.hair_colors}
        </p>
        <p>
          <strong>Skin Colors:</strong> {result.skin_colors}
        </p>
        <p>
          <strong>Language:</strong> {result.language}
        </p>
      </div>
      <Back />
    </div>
  );
};

export default FicheSpecies;
