import React from "react";
import Room from "../interfaces/room";
import DevicelistComponent from "./devicelist";

export default function RoomComponent({ room }: { room: Room }) {
  return (
    <div className="bg-white block w-auto h-auto rounded-tl-xl">
      <DevicelistComponent devices={room.devices}></DevicelistComponent>
    </div>
  );
}
