import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.scss";
import jwtDecode from "jwt-decode";

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

    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
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
                    console.log(jwtDecode(res.data.access), jwtDecode(res.data.refresh));
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

    const {username, password} = formState;

    return (
        <div className={styles.auth_form_wrapper}>
            <form onSubmit={onSubmit}>
                <h3>Login</h3>
                <div className={styles.auth_form_input_container}>
                    <label htmlFor="user">user name
                        <input
                            type="text"
                            placeholder="user name / email"
                            required
                            autoComplete="off"
                            id="user"
                            value={username}
                            onChange={(e) => onChange(e, "username")}
                        /></label>
                    <label htmlFor="password">password
                        <input
                            type="password"
                            placeholder="********"
                            required
                            autoComplete="off"
                            id="password"
                            value={password}
                            onChange={(e) => onChange(e, "password")}
                        /></label>
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}

// TODO : improve error handling
