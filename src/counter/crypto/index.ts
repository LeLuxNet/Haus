import axios from "axios";
import { State } from "../../state";
import { Counter } from "../counter";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export class CryptoCurrency extends Counter {
  id: string;

  constructor(id: string) {
    super(
      new State({}),
      new State({
        get: async function () {
          const res = await api.get("simple/price", {
            params: { ids: id, vs_currencies: "usd" },
          });
          return res.data[id].usd;
        },
        autoUpdate: 10 * 60,
      })
    );
    this.avatar = new State({});

    api.get(`coins/${id}`).then((res) => {
      this.name.update(`${res.data.name} (${res.data.symbol.toUpperCase()})`);
      this.avatar!.update(res.data.image.large);
    });

    this.id = id;
  }
}
