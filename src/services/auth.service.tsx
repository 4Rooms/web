// import axios from "axios";

const login = async (url: any, data: any) => {
  try {
    // const res = await axios({
    //   data: data,
    //   withCredentials: true,
    //   url: url,
    //   method: "POST",
    // });

    // console.log(res.data);

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    const respData = await response.json();

    if (response.status !== 200) {
      throw new Error("Response status is not 200");
    }

    return respData;
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
