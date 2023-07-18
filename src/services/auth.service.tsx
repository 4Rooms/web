import axios from "axios";
import jwtDecode from "jwt-decode";

const login = (url: any, data: any) => {
  return axios({
    url: url,
    method: "POST",
    data: data,
  }).then((res) => {
    if (res.status !== 400 && res.status !== 401) {
      console.log(jwtDecode(res.data.access), jwtDecode(res.data.refresh));
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
    }

    return res.data;
  });
};

const logout = () => {
  localStorage.removeItem("accessToken");
};

const authService = {
  login,
  logout,
};

export default authService;
