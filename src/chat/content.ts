import { Stream } from "stream";
import { Lazy } from "../lazy";

export type ChatContent = TextMessage | AttachmentMessage;

interface TextMessage {
  type: "text";

  text: string;
}

export type AttachmentType = "image" | "audio" | "video" | "document";

interface AttachmentMessage {
  type: AttachmentType;

  name: string;
  data: Lazy<Promise<string | Buffer | Stream>>;
}
