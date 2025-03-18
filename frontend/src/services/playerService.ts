import type { AxiosInstance } from "axios";

export class PlayerService {
  private axios: AxiosInstance;
  private url = "/playername";

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance;
  }

  async getPlayername(): Promise<string> {
    const response = await this.axios.get(this.url, {
      withCredentials: true,
    });
    return response.data.playername;
  }
}
