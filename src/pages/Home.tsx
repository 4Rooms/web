import React, { useContext } from "react";
import { AuthContext } from "../pages/auth/AuthContext/AuthContext";
// import axios from "axios";

export default function Home({ username }: { username: string | null }) {
  // const { username } = useContext(AuthContext);

  const getImg = () => {
    fetch("https://test-chat.duckdns.org/api/profile/avatar/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log({ result });
      });
  };

  return (
    <div className="Home">
      <h1>This is a homepage, {username}</h1>
    </div>
  );
}
