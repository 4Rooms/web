import React, { useContext } from "react";
import { AuthContext } from "../pages/auth/AuthContext/AuthContext";
import axios from "axios";

export default function Home() {
  const { username } = useContext(AuthContext);

  const getImg = () => {
    axios
      .get("https://prod-chat.duckdns.org/api/profile/avatar/")
      .then((res) => console.log(res));
  };

  return (
    <div className="Home">
      <h1>This is a homepage, {username}</h1>
      <button onClick={getImg}>Get img</button>
    </div>
  );
}
