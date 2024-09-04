import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./List.module.css";

function List({ type }) {
  const location = useLocation();
  const results = location.state;
  const filteredData =
    type === "all"
      ? results || []
      : (results || []).filter((item) => item.type === type);

  return (
    <div className={styles.list}>
      {Array.isArray(filteredData) && filteredData.length > 0 ? (
        filteredData
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((result) => (
            <Link
              key={result.name}
              className={`${styles.linkItem} ${styles[result.type]}`}
              to={`/${result.type}/${result.name}`}
              state={result}
            >
              {result.name}
            </Link>
          ))
      ) : (
        <p className={styles.nothing}>Aucun résultat trouvé</p>
      )}
    </div>
  );
}

export default List;
