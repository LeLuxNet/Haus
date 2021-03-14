import axios from "axios";
import { Client } from "discord-rpc";
import { onExit } from "../../cleanup";
import { State } from "../../state";

const voidState = {
  set: async () => undefined,
};

export class DiscordRPC {
  name: State<string>;
  private nameUpdated: boolean = false;

  largeImg: State<string | undefined> = new State(voidState);
  largeImgText: State<string | undefined> = new State(voidState);

  smallImg: State<string | undefined> = new State(voidState);
  smallImgText: State<string | undefined> = new State(voidState);

  line1: State<string | undefined> = new State(voidState);
  line2: State<string | undefined> = new State(voidState);

  button1text: State<string | undefined> = new State(voidState);
  button1url: State<string | undefined> = new State(voidState);

  button2text: State<string | undefined> = new State(voidState);
  button2url: State<string | undefined> = new State(voidState);

  showFrom: State<boolean> = new State<boolean>({
    initial: false,
    set: async () => undefined,
  });

  constructor(clientId: string, token?: string) {
    if (token !== undefined) {
      this.name = new State({
        get: () =>
          axios
            .get(`https://discord.com/api/v8/applications/${clientId}`, {
              headers: { Authorization: token },
            })
            .then((res) => res.data.name),
        set: async (name: string) => {
          await axios.patch(
            `https://discord.com/api/v8/applications/${clientId}`,
            { name },
            { headers: { Authorization: token } }
          );
          this.nameUpdated = true;
        },
      });
    } else {
      this.name = new State({});
    }

    const client = new Client({ transport: "ipc" });

    client.on("ready", () => {
      const time = new Date();

      setInterval(async () => {
        if (this.nameUpdated) {
          this.nameUpdated = false;
          await client.clearActivity(process.pid);
        }

        const buttons = [];

        if (
          this.button1text.last !== undefined &&
          this.button1url.last !== undefined
        ) {
          buttons.push({
            label: this.button1text.last,
            url: this.button1url.last,
          });
        }

        if (
          this.button2text.last !== undefined &&
          this.button2url.last !== undefined
        ) {
          buttons.push({
            label: this.button2text.last,
            url: this.button2url.last,
          });
        }

        await client.setActivity(
          {
            details: this.line1.last,
            state: this.line2.last,

            startTimestamp: this.showFrom.last ? time : undefined,

            largeImageKey: this.largeImg.last,
            largeImageText: this.largeImgText.last,

            smallImageKey: this.smallImg.last,
            smallImageText: this.smallImgText.last,

            instance: false,
            buttons,
          },
          process.pid
        );
      }, 15 * 1000);

      onExit(() => client.clearActivity(process.pid));
    });

    client.login({ clientId }).catch(console.error);
  }
}
