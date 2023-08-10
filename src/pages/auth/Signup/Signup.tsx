import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/auth/auth.service";
import styles from "../Login/Login.module.css";

export default function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
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

  const handleSignup = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = "https://test-chat.duckdns.org/api/register/";
    const data = {
      username: formState.username,
      email: formState.email,
      password: formState.password,
    };

    const response = await authService.signup(url, data);
    console.log(response);
    if (!response) throw new Error("Response is undefined");
    navigate("/check-your-email");
  };

  return (
    <div className={styles.auth_form_wrapper}>
      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <div className={styles.auth_form_input_container}>
          <label htmlFor="user">user name</label>
          <input
            type="text"
            placeholder="user name"
            required
            autoComplete="off"
            id="user"
            value={formState.username}
            onChange={(e) => onChange(e, "username")}
          />
          <label htmlFor="email">email</label>
          <input
            type="email"
            placeholder="user@gmail.com"
            required
            autoComplete="off"
            id="email"
            value={formState.email}
            onChange={(e) => onChange(e, "email")}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            placeholder="********"
            required
            autoComplete="off"
            id="password"
            value={formState.password}
            onChange={(e) => onChange(e, "password")}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
