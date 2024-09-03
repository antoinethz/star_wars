import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Fiche.module.css";
import Back from "../Back";

const FichePeople = () => {
  const location = useLocation();

  const result = location.state;

  return (
    <div className={styles.fiche}>
      <h2 className={styles.heading}>{result.name}</h2>
      <div className={styles.details}>
        <p>
          <strong>Birth Year:</strong> {result.birth_year}
        </p>
        <p>
          <strong>Eye Color:</strong> {result.eye_color}
        </p>
        <p>
          <strong>Gender:</strong> {result.gender}
        </p>
        <p>
          <strong>Hair Color:</strong> {result.hair_color}
        </p>
        <p>
          <strong>Height:</strong> {result.height} cm
        </p>
        <p>
          <strong>Mass:</strong> {result.mass} kg
        </p>
        <p>
          <strong>Skin Color:</strong> {result.skin_color}
        </p>
        {/* <p>
          <strong>Homeworld:</strong>{" "}
          <a
            href={result.homeworld}
            target="_blank"
            rel="noopener noreferrer"
          >
            Homeworld Link
          </a>
        </p>
        <p>
          <strong>Species:</strong>{" "}
          {result.species.length > 0
            ? result.species.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Species {index + 1}
                </a>
              ))
            : "N/A"}
        </p>
        <p>
          <strong>Starships:</strong>{" "}
          {result.starships.length > 0
            ? result.starships.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Starship {index + 1}
                </a>
              ))
            : "N/A"}
        </p>
        <p>
          <strong>Vehicles:</strong>{" "}
          {result.vehicles.length > 0
            ? result.vehicles.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vehicle {index + 1}
                </a>
              ))
            : "N/A"}
        </p> */}
      </div>
      <Back></Back>
    </div>
  );
};

export default FichePeople;
