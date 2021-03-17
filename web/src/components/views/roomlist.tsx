import React from "react";
import Room from "../../interfaces/room";

export default function RoomlistComponent({
  rooms,
  currentRoom,
  changeRoom,
}: {
  rooms: Room[];
  currentRoom: number;
  changeRoom: (room: Room) => void;
}) {
  return (
    <div className="flex flex-col p-3 pt-0 draggable">
      {rooms.map((room) => {
        if (room) {
          return (
            <button
              className={`w-16 h-16 transition-border bg-gray-200 text-grey-800 mb-3 not-draggable select-none text-4xl place-items-center flex justify-center ${
                currentRoom == room.id
                  ? "rounded-2xl"
                  : "rounded-50pc hover:rounded-2xl"
              }`}
              key={room.id}
              onClick={() => changeRoom(room)}
            >
              {room.name[0]}
            </button>
          );
        }
        return undefined;
      })}
    </div>
  );
}
