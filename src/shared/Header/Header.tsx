import React from "react";
import { NavLink } from "react-router-dom";
import authService from "../../services/auth.service";

export default function Header({ user }: { user: string | null }) {
  // const logout = () => {
  //   localStorage.removeItem("accessToken");
  // };

  const logout = () => {
    authService.logout();
  };

  return (
    <header>
      <ul style={{ listStyle: "none" }}>
        <li>
          <NavLink to={"/user-profile/1"}>User Profile</NavLink>
        </li>

        {user ? (
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
