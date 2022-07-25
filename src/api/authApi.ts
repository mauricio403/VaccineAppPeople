import axios from "axios";

export const authApi = axios.create({
    baseURL: "https://vaccine-backend2.herokuapp.com/api",
})