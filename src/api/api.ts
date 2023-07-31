import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const fetchToken = (username: string, password: string) => {
    return axios({
        url: `${import.meta.env.BASE_URL}token/`,
        method: "POST",
        data: {
            username: username,
            password: password,
        },
    })
        .then((res) => {
            if (res.status !== 400 && res.status !== 401) {
                console.log(jwtDecode(res.data.access), jwtDecode(res.data.refresh));
                localStorage.setItem("accessToken", res.data.access);
                localStorage.setItem("refreshToken", res.data.refresh);
                return res;
            } else {
                throw new Error('Unauthorized');
            }
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
};
