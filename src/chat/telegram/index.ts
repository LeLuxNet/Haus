// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env["NTBA_FIX_319"] = "1";

import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { Lazy } from "../../lazy";
import { Chat } from "../chat";
import { AttachmentType, ChatContent } from "../content";
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

      const sendFile = (type: AttachmentType, fileId: string) =>
        this.msg.trigger(
          new TelegramMessage(
            {
              type,
              name: "",
              data: new Lazy(async () => {
                const f = await client.getFileLink(fileId);
                const res = await axios.get(f, { responseType: "stream" });
                return res.data;
              }),
            },
            msg,
            client
          )
        );

      const fileIds: string[] = [];
      if (msg.photo !== undefined) {
        msg.photo.forEach((f) => sendFile("image", f.file_id));
      }

      if (msg.video !== undefined) sendFile("video", msg.video.file_id);
      if (msg.audio !== undefined) sendFile("audio", msg.audio.file_id);
      if (msg.voice !== undefined) sendFile("video", msg.voice.file_id);
      if (msg.document !== undefined)
        sendFile("document", msg.document.file_id);
      if (msg.sticker !== undefined) sendFile("image", msg.sticker.file_id);
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
      case "image":
        await this._client.sendPhoto(this._chatId, await content.data.get());
        break;
      case "audio":
        await this._client.sendAudio(this._chatId, await content.data.get());
        break;
      case "video":
        await this._client.sendVideo(this._chatId, await content.data.get());
        break;
      case "document":
        await this._client.sendDocument(this._chatId, await content.data.get());
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
