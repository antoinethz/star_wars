import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./List.module.css";

function List() {
  const location = useLocation();
  const results = location.state;

  return (
    <div>
      <ul>
        {Array.isArray(results) &&
          results.map((result) => (
            <li key={result.name}>
              <Link
                className={`${styles.linkItem} ${styles[result.type]}`}
                to={`/${result.type}/${result.name}`}
                state={result}
              >
                {result.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default List;
