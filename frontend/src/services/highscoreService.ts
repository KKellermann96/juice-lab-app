import type { AxiosInstance } from "axios";
import { Highscore } from "../models";

export class HighscoreService {
  private axios: AxiosInstance;
  private url = "/highscores";

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  async getHighscores(): Promise<Highscore[]> {
    const response = await this.axios.get<Highscore[]>(this.url);
    return response.data;
  }

  async updateHighscore(name: string, score: number) {
    await this.axios.post(this.url, { name, score });
  }
}
