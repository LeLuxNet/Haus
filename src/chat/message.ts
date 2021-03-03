import { ChatContent } from "./content";

export class ChatMessage {
  content: ChatContent;

  author: ChatAuthor;
  channel: ChatChannel;

  constructor(content: ChatContent, author: ChatAuthor, channel: ChatChannel) {
    this.content = content;
    this.author = author;
    this.channel = channel;
  }

  reply(content: ChatContent) {
    return this.channel.send(content);
  }
}

export interface ChatAuthor {
  name: string;
}

export abstract class ChatChannel {
  name: string;
  dm: boolean;

  constructor(name: string, dm: boolean) {
    this.name = name;
    this.dm = dm;
  }

  abstract send(content: ChatContent): Promise<void>;
}
