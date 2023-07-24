import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import authService from "../../../services/auth.service";
import { AuthContext } from "../AuthContext/AuthContext";

export default function Login() {
  const { username, setUsername } = useContext(AuthContext);

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

    const url = "https://test-chat.duckdns.org/api/login/";

    const data = {
      username: formState.username,
      password: formState.password,
    };

    try {
      await authService.login(url, data).then(
        (responseData) => {
          console.log(responseData);
          setUsername(responseData.user.username);
          navigate("/home");
          // window.location.reload();
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
              value={formState.username}
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
              value={formState.password}
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
