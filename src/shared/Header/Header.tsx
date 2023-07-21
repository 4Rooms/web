import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import authService from "../../services/auth.service";
import {
  AuthContext,
  AuthProvider,
} from "../../pages/auth/AuthContext/AuthContext";

export default function Header({ user }: { user: string | null }) {
  const { username, setUsername } = useContext(AuthContext);

  const logout = () => {
    authService.logout();
  };

  return (
    <header>
      <ul style={{ listStyle: "none" }}>
        <li>
          <NavLink to={"/user-profile/1"}>User Profile</NavLink>
        </li>

        {username ? (
          <li>
            <a href="/login" onClick={logout}>
              Logout{" "}
            </a>
          </li>
        ) : (
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
        )}
      </ul>
    </header>
  );
}
