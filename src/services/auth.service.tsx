import axios from "axios";

const login = async (url: any, data: any) => {
  try {
    const res = await axios({
      url: url,
      method: "POST",
      data: data,
      // headers: {
      //   "Content-Type": "application/json;charset=utf-8",
      // },
    });

    console.log(res.data);

    if (res.status !== 200) {
      throw new Error("Response status is not 200");
    }

    return res.data;
  } catch (error) {
    console.error("Error occurred during login:", error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};

const logout = () => {
  localStorage.removeItem("accessToken");
};

const authService = {
  login,
  logout,
};

export default authService;
