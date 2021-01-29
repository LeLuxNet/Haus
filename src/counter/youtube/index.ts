import axios from "axios";
import { State } from "../../state";
import { Counter } from "../counter";

export class YouTube extends Counter {
  id: string;
  key: string;

  constructor(id: string, key: string) {
    super(
      new State<string>(undefined, undefined, undefined),
      new State<number>(undefined, undefined, undefined)
    );

    this.id = id;
    this.key = key;

    this.avatar = new State<string>(undefined, undefined, undefined);

    this._update();
    setInterval(() => this._update(), 1 * 60 * 1000);
  }

  async _update() {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          key: this.key,
          id: this.id,
          part: "snippet,statistics",
        },
      }
    );
    const item = res.data.items[0];

    this.name.update(item.snippet.title);
    this.val.update(item.statistics.subscriberCount);
    this.avatar?.update(item.snippet.thumbnails.high.url);
  }
}
