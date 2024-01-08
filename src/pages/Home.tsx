import React from "react";

export default function Home({ username }: { username: string | null }) {
  const getImg = () => {
    const URL = `${import.meta.env.VITE_API_URL}/profile/`;

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
