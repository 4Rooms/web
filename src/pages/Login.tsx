import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  // previously set type of e ("React.ChangeEvent<HTMLFormElement>"") somehow gives errors
  const onSubmit = (e: any) => {
    e.preventDefault();

    const url = "https://prod-chat.duckdns.org/api/token/";

    const data = {
      username: formState.username,
      password: formState.password,
    };

    axios({
      url: url,
      method: "POST",
      data: data,
    })
      .then((res) => {
        if (res.status !== 400 && res.status !== 401) {
          console.log(res);
          localStorage.setItem("accessToken", res.data.access);
          localStorage.setItem("refreshToken", res.data.refresh);
          navigate("/home");
        }
      })

      .catch((err) => {
        alert(err.response.data.detail);
        console.error(err);
      });
  };

  const { username, password } = formState;

  return (
    <div className="auth_form_wrapper">
      <form onSubmit={(e) => onSubmit(e)}>
        <h3>Login</h3>
        <label htmlFor="user">user name</label>
        <input
          type="text"
          placeholder="user name / email"
          required
          autoComplete="off"
          id="user"
          value={username}
          onChange={(e) => onChange(e, "username")}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="********"
          required
          autoComplete="off"
          id="password"
          value={password}
          onChange={(e) => onChange(e, "password")}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

// TODO : improve error handling
