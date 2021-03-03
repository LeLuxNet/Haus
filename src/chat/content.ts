import { Stream } from "stream";
import { Lazy } from "../lazy";

export type ChatContent = TextMessage | AttachmentMessage;

interface TextMessage {
  type: "text";

  text: string;
}

interface AttachmentMessage {
  type: "attachment";

  attachment: Lazy<Promise<string | Buffer | Stream>>;
}
