import React, { useContext } from "react";
import { AuthContext } from "../pages/auth/AuthContext/AuthContext";
import axios from "axios";

export default function Home() {
  const { username } = useContext(AuthContext);

  return (
    <div className="Home">
      <h1>This is a homepage, {username}</h1>
    </div>
  );
}
