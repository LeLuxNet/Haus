// https://github.com/yagop/node-telegram-bot-api/issues/319
process.env["NTBA_FIX_319"] = "1";
process.env["NTBA_FIX_350"] = "1";

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

      const sendFile = async (type: AttachmentType, fileId: string) => {
        const f = await client.getFileLink(fileId);
        const parts = f.split("/");

        this.msg.trigger(
          new TelegramMessage(
            {
              type,
              name: parts[parts.length - 1],
              data: new Lazy(() =>
                axios
                  .get(f, {
                    responseType: "stream",
                  })
                  .then((res) => res.data)
              ),
            },
            msg,
            client
          )
        );
      };

      if (msg.photo !== undefined) {
        msg.photo.forEach((f) => sendFile("image", f.file_id));
      }

      if (msg.video !== undefined) sendFile("video", msg.video.file_id);
      if (msg.audio !== undefined) sendFile("audio", msg.audio.file_id);
      if (msg.voice !== undefined) sendFile("audio", msg.voice.file_id);
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
      { name: getName(msg.from!), bot: msg.from!.is_bot },
      new TelegramChannel(client, msg.chat)
    );
    this._client = client;
    this._chatId = msg.chat.id;
    this._msgId = msg.message_id;
  }

  reply(content: ChatContent) {
    return sendMessage(content, this._client, this._chatId, this._msgId);
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

  send(content: ChatContent) {
    return sendMessage(content, this._client, this._chatId);
  }
}

async function sendMessage(
  content: ChatContent,
  client: TelegramBot,
  chatId: number,
  msgId?: number
) {
  const options: TelegramBot.SendMessageOptions = {
    reply_to_message_id: msgId,
  };

  if (content.type === "text") {
    client.sendMessage(chatId, content.text, options);
  } else {
    const data = await content.data.get();
    const fileOptions = {
      filename: content.name,
      filepath: false,
    };

    switch (content.type) {
      case "image":
        (client.sendPhoto as any)(chatId, data, options, fileOptions);
        break;
      case "audio":
        (client.sendAudio as any)(chatId, data, options, fileOptions);
        break;
      case "video":
        (client.sendVideo as any)(chatId, data, options, fileOptions);
        break;
      case "document":
        client.sendDocument(chatId, data, options, fileOptions);
        break;
    }
  }
}
