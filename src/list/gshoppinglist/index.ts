import axios, { AxiosError, AxiosInstance } from "axios";
import { stringify } from "qs";
import { List } from "../list";

export class GoogleShoppingList extends List {
  api: AxiosInstance;
  constructor(sid: string, hsid: string, ssid: string) {
    super();

    this.api = axios.create({
      baseURL: "https://shoppinglist.google.com/_",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: `SID=${sid}; HSID=${hsid}; SSID=${ssid}`,
      },
    });

    this.api.interceptors.request.use((config) => {
      config.data["f.req"] = "[[1],[]]";
      config.data = stringify(config.data);
      return config;
    });
    this.api.interceptors.response.use((res) => {
      res.data = JSON.parse(res.data.slice(4));
      return res;
    });
  }

  async fetch() {
    const res = await this.api.post(
      "list/collab/fetch",
      {},
      {
        validateStatus: (s) => s === 400,
      }
    );
    const xsrf = res.data[0][4][1];

    const res2 = await this.api.post("list/collab/fetch", { xsrfToken: xsrf });
    const list = res2.data[0][2][0][2][2]
      .filter((e: any) => e[3] === 2)
      .map((e: any) => {
        return {
          title: e[2][0],
          description: e.length >= 7 ? e[6] : undefined,
        };
      });
    console.log(list);
  }
}
