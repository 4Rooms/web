import React, { useContext } from "react";

export default function Home({ username }: { username: string | null }) {
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
