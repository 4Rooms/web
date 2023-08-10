import React from "react";
// import { testServerURL } from "../apiUrls/apiUrls";

export default function Home({ username }: { username: string | null }) {
  const getImg = () => {
    const URL = "https://test-chat.duckdns.org/api/profile/";
    // const URL = `${import.meta.env.TEST_URL}profile/avatar/`;
    try {
      fetch(URL, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log({ result });
        });
    } catch (err) {
      console.error(`ERRROR: ${err}`);
    }
  };

  return (
    <div className="Home">
      <h1>This is a homepage, {username}</h1>
      <button onClick={getImg}>Get img</button>
    </div>
  );
}
