import axios from "axios";

const api = axios.create({
  baseURL: "https://pycsoftwaremx.com/david/rest_api_alu_materias_daw/api",
});

export default api;
