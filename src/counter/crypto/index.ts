import axios from "axios";
import { State } from "../../state";
import { Update } from "../../update";
import { Counter } from "../counter";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export class CryptoCurrency extends Counter {
  constructor(id: string) {
    const update = new Update(async () => {
      const res = await api.get(`coins/${id}`);

      this.name.update(`${res.data.name} (${res.data.symbol.toUpperCase()})`);
      avatar.update(res.data.image.large);
    });

    const avatar = new State<string>({ update });

    super(
      new State({ update }),
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

    this.avatar = avatar;
  }
}
