// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env["NTBA_FIX_319"] = "1";

import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { Lazy } from "../../lazy";
import { Chat } from "../chat";
import { ChatContent } from "../content";
import { ChatChannel, ChatMessage } from "../message";

export class Telegram extends Chat {
  constructor(token: string) {
    super();

    const client = new TelegramBot(token, { polling: true });

    client.on("message", async (msg) => {
      if (msg.text !== undefined) {
        this.msg.trigger(
          new TelegramMessage({ type: "text", text: msg.text }, msg, client)
        );
      }

      const fileIds: string[] = [];
      if (msg.photo !== undefined) {
        msg.photo.forEach((f) => fileIds.push(f.file_id));
      }

      if (msg.video !== undefined) {
        fileIds.push(msg.video.file_id);
      }

      if (msg.audio !== undefined) {
        fileIds.push(msg.audio.file_id);
      }

      if (msg.voice !== undefined) {
        fileIds.push(msg.voice.file_id);
      }

      if (msg.document !== undefined) {
        fileIds.push(msg.document.file_id);
      }

      if (msg.sticker !== undefined) {
        fileIds.push(msg.sticker.file_id);
      }

      const files = await Promise.all(
        fileIds.map((f) => client.getFileLink(f))
      );

      files.forEach((f) =>
        this.msg.trigger(
          new TelegramMessage(
            {
              type: "attachment",
              attachment: new Lazy(() =>
                axios.get(f, { responseType: "stream" }).then((res) => res.data)
              ),
            },
            msg,
            client
          )
        )
      );
    });
  }
}

class TelegramMessage extends ChatMessage {
  _client: TelegramBot;
  _chatId: number;
  _msgId: number;

  constructor(
    content: ChatContent,
    msg: TelegramBot.Message,
    client: TelegramBot
  ) {
    super(
      content,
      { name: getName(msg.from!) },
      new TelegramChannel(client, msg.chat)
    );
    this._client = client;
    this._chatId = msg.chat.id;
    this._msgId = msg.message_id;
  }

  async reply(content: ChatContent) {
    switch (content.type) {
      case "text":
        await this._client.sendMessage(this._chatId, content.text, {
          reply_to_message_id: this._msgId,
        });
        break;
      case "attachment":
        await this._client.sendDocument(
          this._chatId,
          await content.attachment.get()
        );
        break;
    }
  }
}

function getName(user: TelegramBot.User) {
  if (user.last_name !== undefined) {
    return `${user.first_name} ${user.last_name}`;
  }
  return user.first_name;
}

class TelegramChannel extends ChatChannel {
  _client: TelegramBot;
  _chatId: number;

  constructor(client: TelegramBot, chat: TelegramBot.Chat) {
    const dm = chat.type === "private";
    super((dm ? chat.username : chat.title) || "", dm);
    this._client = client;
    this._chatId = chat.id;
  }

  async send(content: ChatContent) {
    switch (content.type) {
      case "text":
        await this._client.sendMessage(this._chatId, content.text);
        break;
    }
  }
}
