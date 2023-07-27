import React from "react";
import { testServerURL } from "../apiUrls/apiUrls";

export default function Home({ username }: { username: string | null }) {
  const getImg = () => {
    fetch(`${testServerURL}api/profile/avatar/`, {
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
      <button onClick={getImg}>Get img</button>
    </div>
  );
}
