import axios from "axios";
import { Plugin } from "../../plugins";
import { State } from "../../state";
import { Update } from "../../update";
import { Counter } from "../counter";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export default <Plugin>{
  name: "Cryptocurrencies",

  create: async ({ id }) => {
    const update = new Update(async () => {
      const res = await api.get(`coins/${id}`);

      name.update(`${res.data.name} (${res.data.symbol.toUpperCase()})`);
      avatar.update(res.data.image.large);
    });

    const name = new State<string>({ update });
    const val = new State<number>({
      get: async () => {
        const res = await api.get("simple/price", {
          params: { ids: id, vs_currencies: "usd" },
        });
        return res.data[id].usd;
      },
      autoUpdate: 60,
    });
    const avatar = new State<string>({ update });

    return new Counter(name, val);
  },
};
