import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.scss";
import jwtDecode from "jwt-decode";
import authService from "../../../services/auth.service";

export default function Login() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [type]: e.target.value,
    });
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = "https://prod-chat.duckdns.org/api/token/";

    const data = {
      username: formState.username,
      password: formState.password,
    };

    try {
      await authService.login(url, data).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err: any) {
      alert(err.response.data.detail);
      console.log(err);
    }
  };

  const { username, password } = formState;

  return (
    <div className={styles.auth_form_wrapper}>
      <form onSubmit={onSubmit}>
        <h3>Login</h3>
        <div className={styles.auth_form_input_container}>
          <label htmlFor="user">
            user name
            <input
              type="text"
              placeholder="user name / email"
              required
              autoComplete="off"
              id="user"
              value={username}
              onChange={(e) => onChange(e, "username")}
            />
          </label>
          <label htmlFor="password">
            password
            <input
              type="password"
              placeholder="********"
              required
              autoComplete="off"
              id="password"
              value={password}
              onChange={(e) => onChange(e, "password")}
            />
          </label>
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

// TODO : improve error handling
