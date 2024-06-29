import http from "./axioscontext";

const signup_c = (data) => {
  return http.post("/auth/signup_c", data);
};
const signup_v = (data) => {
  return http.post("/auth/signup_v", data);
};
const signin = (data) => {
  return http.post("/auth/signin", data);
};

const logout = () => {
  const token = localStorage.getItem("refreshToken");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return http.get("/auth/logout", { headers });
};
const refreshToken = () => {
  const token = localStorage.getItem("refreshToken");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return http.get("/auth/refresh", { headers });
};

export default {
  signup_c,
  signup_v,
  signin,
  refreshToken,
  logout,
};
