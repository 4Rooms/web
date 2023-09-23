import React, { useState, useContext } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { AuthContext } from "../auth-context/auth-context";
import authService from "../../../services/auth/auth.service.tsx";
import { localStorageService } from "../../../services/local-storage/local-storage.ts";
import styles from "./Login.module.scss";

export default function Login() {
  const { setUsername } = useContext(AuthContext);

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
    // const url = `${import.meta.env.TEST_URL}login/`;
    try {
      const url = "https://back.4rooms.pro/api/login/";

      const data = {
        username: formState.username,
        password: formState.password,
      };
      const response = await authService.login(url, data);
      // console.log(response);
      // if (!response) throw new Error("Response is undefined");

      setUsername(response.user.username);
      localStorageService.set("user", response.user);
      navigate("/home");
    } catch (error: any) {
      alert(error.Invalid);
    }
  };

  return (
    <div className={styles.auth_form_wrapper}>
      <form onSubmit={onSubmit}>
        <h3>Authentication</h3>
        <div>
          Sign in with Google:
          <Link to={'https://back.4rooms.pro/oauth/login/google-oauth2/'}>
            <button type={"button"}>Google</button>
          </Link>
        </div>
        <div className={styles.auth_form_input_container}>
          <h2>Or sign in with your username and password:</h2>
          <label htmlFor="user">
            <input
              type="text"
              placeholder="Enter your username"
              required
              autoComplete="off"
              id="user"
              value={formState.username}
              onChange={(e) => onChange(e, "username")}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="off"
              id="password"
              value={formState.password}
              onChange={(e) => onChange(e, "password")}
            />
          </label>
        </div>
        <NavLink className={"forget_psw_link"} to={"/forgot-password"}>
          Forgot password?
        </NavLink>
        <button type="submit">Sign in </button>
      </form>
    </div>
  );
}
