import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000", // Ajuste se precisar
});

export default api;