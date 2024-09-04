import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";
import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      await axios.get("http://localhost:3000", {
        auth: {
          username: username,
          password: password,
        },
      });
      dispatch(login({ username, password }));
      setAuthError("");
    } catch (error) {
      console.error("Authentication failed:", error);
      setAuthError("Authentification échouée !");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={styles.input}
      />
      <button
        onClick={handleLogin}
        className={styles.button}
      >
        Login
      </button>
      {authError && <p className={styles.error}>{authError}</p>}
    </div>
  );
}

export default Login;
