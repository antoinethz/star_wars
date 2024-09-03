import React from "react";
import styles from "./Back.module.css";
import { useNavigate } from "react-router-dom";

function Back() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <button
      className={styles.goBackButton}
      onClick={handleGoBack}
    >
      Retour
    </button>
  );
}

export default Back;
