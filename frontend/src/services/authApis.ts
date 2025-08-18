import axios from "axios";
const API_BASE_URL = "/api"; //"http://localhost:8081";

export const login = (email: string, password: string) =>
  axios.post(
    `${API_BASE_URL}/auth/login`,
    {
      email: email,
      password: password,
    },
    { withCredentials: true }
  );

export const registerNewUser = (userData: object) =>
  axios.post(`${API_BASE_URL}/auth/register`, userData);
