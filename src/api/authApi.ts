import axios from "axios";

export const authApi = axios.create({
    baseURL: "https://vaccine-backend3.herokuapp.com/api",
})