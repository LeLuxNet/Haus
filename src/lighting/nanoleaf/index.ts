import axios, { AxiosInstance } from "axios";
import { Lighting } from "../lighting";

class Nanoleaf extends Lighting {
  api: AxiosInstance;

  constructor(host: string, key: string) {
    super();
    this.api = axios.create({
      baseURL: `${host}/api/v1/${key}`,
    });
  }

  static async link(host: string) {
    const res = await axios.post(`${host}/api/v1/new`);

    return new Nanoleaf(host, res.data.auth_token);
  }
}
