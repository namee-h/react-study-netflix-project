import axios from "axios";
const MOVIE_API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${MOVIE_API_KEY}`,
  },
});

export default api;
