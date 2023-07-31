// import axios from "axios";

const login = async (url: string, data: unknown) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Response status is not 200");

  return await response.json();
};

const logout = () => {
  localStorage.clear();
};

const authService = {
  login,
  logout,
};

export default authService;
