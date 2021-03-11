import axios from "axios";
import {
  createClient,
  MatrixClient,
  MatrixEvent,
  Room,
  RoomMember,
} from "matrix-js-sdk";
import { Lazy } from "../../lazy";
import { Chat } from "../chat";
import { AttachmentType, ChatContent } from "../content";
import { ChatChannel, ChatMessage } from "../message";

const typeMap: { [type: string]: AttachmentType } = {
  "m.image": "image",
  "m.audio": "audio",
  "m.video": "video",
  "m.file": "document",
};

const mTypeMap = {
  image: "m.image",
  audio: "m.audio",
  video: "m.video",
  document: "m.file",
};

export class Matrix extends Chat {
  constructor(userId: string, accessToken: string, server: string) {
    super();

    userId = userId.toLowerCase();
    const client = createClient({
      baseUrl: server,
      accessToken: accessToken,
      userId,
    });

    // Auto join
    client.on("RoomMember.membership", (_, member: RoomMember) => {
      if (member.membership === "invite" && member.userId === userId) {
        client.joinRoom(member.roomId);
      }
    });

    client.on(
      "Room.timeline",
      (event: MatrixEvent, room: Room, timelineStart: boolean) => {
        // Ignore old messages
        if (timelineStart) return;

        // Ignore own messages
        if (event.sender.userId === userId) return;

        // Only chat messages
        if (event.getType() !== "m.room.message") return;

        const c: any = event.getContent();
        if (c["m.new_content"] !== undefined) return;

        console.log(1, c);

        var content: ChatContent;
        if (c.msgtype === "m.text") {
          content = { type: "text", text: c.body };
        } else {
          const type = typeMap[c.msgtype];
          if (type === undefined) return;

          content = {
            type,
            name: c.body,
            data: Lazy.pval(
              `${server}/_matrix/media/r0/download/${c.url.slice(6)}`
            ),
          };
        }

        this.msg.trigger(new MatrixMessage(content, event, room, client));
      }
    );

    client.startClient({ initialSyncLimit: 0 });
  }
}

class MatrixMessage extends ChatMessage {
  constructor(
    content: ChatContent,
    event: MatrixEvent,
    room: Room,
    client: MatrixClient
  ) {
    super(
      content,
      { name: event.sender.name, bot: false },
      new MatrixChannel(room, client)
    );
  }
}

class MatrixChannel extends ChatChannel {
  private roomId: string;
  private client: MatrixClient;

  constructor(room: Room, client: MatrixClient) {
    super(room.name, room.currentState.getJoinedMemberCount() === 2);
    this.roomId = room.roomId;
    this.client = client;
  }

  async send(content: ChatContent) {
    switch (content.type) {
      case "text":
        // @ts-ignore
        await this.client.sendTextMessage(this.roomId, content.text);
        break;
      case "image":
      case "audio":
      case "video":
      case "document":
        var file = await content.data.get();
        if (typeof file === "string") {
          const res = await axios.get(file, { responseType: "stream" });
          file = res.data;
        }

        const upload: any = await this.client.uploadContent(
          file, // @ts-ignore
          { name: content.name, rawResponse: false }
        );

        const body = {
          msgtype: mTypeMap[content.type],
          body: content.name,
          url: upload.content_uri,
        };

        const event: any = await this.client.sendMessage(this.roomId, body);
        const eventId = event.event_id;
        break;
    }
  }
}
