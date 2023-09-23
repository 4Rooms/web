import React, { useState, useContext } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { AuthContext } from "../auth-context/auth-context";
import authService from "../../../services/auth/auth.service.tsx";
import { localStorageService } from "../../../services/local-storage/local-storage.ts";
import styles from "./Login.module.scss";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation('translation', { keyPrefix: 'sign-in-page' });
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
        <h3>{t('title')}</h3>
        <div>
          {t('signInWithGoogle')}
          <Link to={'https://back.4rooms.pro/oauth/login/google-oauth2/'}>
            <button type={"button"}>Google</button>
          </Link>
        </div>
        <div className={styles.auth_form_input_container}>
          <h2>{t('orSignInWithCredentials')}</h2>
          <label htmlFor="user">
            <input
              type="text"
              placeholder={t('enterUsername')}
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
              placeholder={t('enterPassword')}
              required
              autoComplete="off"
              id="password"
              value={formState.password}
              onChange={(e) => onChange(e, "password")}
            />
          </label>
        </div>
        <NavLink className={"forget_psw_link"} to={"/forgot-password"}>
          {t('forgotPassword')}
        </NavLink>
        <button type="submit">{t('signInButton')}</button>
      </form>
    </div>
  );
}
