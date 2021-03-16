import React from "react";
import Room from "../../interfaces/room";

export default function RoomlistComponent({
  rooms,
  changeRoom,
}: {
  rooms: Room[];
  changeRoom: (room: Room) => void;
}) {
  return (
    <div className="flex flex-col p-3 pt-0 draggable">
      {rooms.map((room) => {
        if (room) {
          return (
            <button
              className="w-16 h-16 bg-gray-200 bg-blue rounded-full mb-3 not-draggable select-none text-gray-500 text-4xl place-items-center flex justify-center"
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
