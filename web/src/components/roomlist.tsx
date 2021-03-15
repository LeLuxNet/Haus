import React from "react";
import Room from "../interfaces/room";

export default function RoomlistComponent({ rooms }: { rooms: Room[] }) {
  return (
    <div className="flex flex-col p-3 pt-0 draggable">
      {rooms.map((room) => {
        return (
          <div
            className="w-16 h-16 bg-gray-200 rounded-full mb-3 not-draggable select-none text-gray-500 text-4xl place-items-center flex justify-center"
            key={room.id}
          >
            {room.name[0]}
          </div>
        );
      })}
    </div>
  );
}
