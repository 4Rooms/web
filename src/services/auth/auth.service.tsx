import axios from "axios";

const signup = async (url: string, data: any) => {
  try {
    const response = await axios({
      url,
      method: "POST",
      data,
    });
    return response;
  } catch (err: any) {
    console.error(err.response.data);
  }
  // if (response.status !== 200) {
  //   throw new Error("Response status is not 200");
  // }
};

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
  signup,
  login,
  logout,
};

export default authService;
