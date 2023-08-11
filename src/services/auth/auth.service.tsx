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
};

const confirmEmail = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (err: any) {
    console.error(err.response.data);
  }
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

  if (!response.ok) {
    console.error(`An error occurred with the status: ${response.status}`);
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();

  // if (!response.ok) throw new Error("Response status is not 200");
  // return await response.json();
};

const logout = () => {
  localStorage.clear();
};

const authService = {
  signup,
  confirmEmail,
  login,
  logout,
};

export default authService;
