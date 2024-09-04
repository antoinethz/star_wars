import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Fiche.module.css";
import Back from "../Back";

const FicheVehicles = () => {
  const location = useLocation();
  const result = location.state;

  return (
    <div className={styles.fiche}>
      <div className={`${styles.type} ${styles[result.type]}`}>
        {result.type}
      </div>
      <h2 className={styles.heading}>{result.name}</h2>
      <div className={styles.details}>
        <p>
          <strong>Model:</strong> {result.model}
        </p>
        <p>
          <strong>Vehicle Class:</strong> {result.vehicle_class}
        </p>
        <p>
          <strong>Manufacturer:</strong> {result.manufacturer}
        </p>
        <p>
          <strong>Length:</strong> {result.length} meters
        </p>
        <p>
          <strong>Cost in Credits:</strong> {result.cost_in_credits}
        </p>
        <p>
          <strong>Crew:</strong> {result.crew}
        </p>
        <p>
          <strong>Passengers:</strong> {result.passengers}
        </p>
        <p>
          <strong>Max Atmosphering Speed:</strong>{" "}
          {result.max_atmosphering_speed}
        </p>
        <p>
          <strong>Cargo Capacity:</strong> {result.cargo_capacity} kg
        </p>
        <p>
          <strong>Consumables:</strong> {result.consumables}
        </p>
      </div>
      <Back />
    </div>
  );
};

export default FicheVehicles;
