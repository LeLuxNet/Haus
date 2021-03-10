import axios from "axios";
import {
  Client,
  DMChannel,
  Message,
  NewsChannel,
  TextChannel,
} from "discord.js";
import { Lazy } from "../../lazy";
import { Logger } from "../../logger";
import { Chat } from "../chat";
import { ChatContent } from "../content";
import { ChatChannel, ChatMessage } from "../message";

export class Discord extends Chat {
  logger: Logger;

  constructor(token: string) {
    super();
    this.logger = new Logger("Discord");

    const client = new Client();

    client.on("ready", () => {
      this.logger.info(`Logged in as '${client.user?.tag}'`);
    });

    client.on("message", (msg) => {
      if (msg.author.id === client.user?.id) return;

      this.msg.trigger(
        new DiscordMessage({ type: "text", text: msg.content }, msg)
      );

      Promise.all(
        msg.attachments.map(async (a) => {
          const res = await axios.head(a.url);
          const mime: string = res.headers["content-type"].split("/")[0];
          const parts = a.url.split("/");
          console.log(mime);

          const type =
            mime === "image" || mime === "audio" || mime === "video"
              ? mime
              : "document";

          return new DiscordMessage(
            {
              type,
              name: parts[parts.length - 1],
              data: Lazy.pval(a.attachment),
            },
            msg
          );
        })
      ).then((m) => m.forEach((m2) => this.msg.trigger(m2)));
    });

    client.login(token);
  }
}

class DiscordMessage extends ChatMessage {
  _msg: Message;

  constructor(content: ChatContent, msg: Message) {
    super(
      content,
      { name: msg.member?.nickname || msg.author.username },
      new DiscordChannel(msg.channel)
    );
    this._msg = msg;
  }

  async reply(content: ChatContent) {
    switch (content.type) {
      case "text":
        await this._msg.reply(content.text);
        break;
      case "image":
      case "audio":
      case "video":
      case "document":
        await this._msg.reply({ files: [await content.data.get()] });
        break;
    }
  }
}

type _TextChannel = TextChannel | DMChannel | NewsChannel;

class DiscordChannel extends ChatChannel {
  _channel: _TextChannel;

  constructor(channel: _TextChannel) {
    if (channel instanceof DMChannel) {
      super(channel.recipient.username, true);
    } else {
      super(channel.name, false);
    }

    this._channel = channel;
  }

  async send(content: ChatContent) {
    switch (content.type) {
      case "text":
        await this._channel.send(content.text);
        break;
      case "image":
      case "audio":
      case "video":
      case "document":
        await this._channel.send({ files: [await content.data.get()] });
        break;
    }
  }
}
