import { Trigger } from "../trigger";
import { ChatMessage } from "./message";

export class Chat {
  msg: Trigger<ChatMessage> = new Trigger();
}
