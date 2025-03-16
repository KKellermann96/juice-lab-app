import axios from "axios";

import { HighscoreService } from "./highscoreService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const highscoreService = new HighscoreService(axiosInstance);
