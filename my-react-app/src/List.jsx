import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import Back from "./Back";

function List() {
  const { query } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state;

  return (
    <div>
      <Back></Back>
      <h2>Résultats pour : {query}</h2>
      <ul>
        {Array.isArray(results) &&
          results.map((result) => (
            <li key={result.name}>
              <Link
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
