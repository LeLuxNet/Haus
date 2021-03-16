import React from "react";
import Room from "../interfaces/room";
import Device from "./device";
import DevicelistComponent from "./devicelist";

export default function RoomComponent({ room }: { room: Room }) {
  return (
    <div className="h-auto grid split">
      <DevicelistComponent devices={room.devices}></DevicelistComponent>
      <Device device={room.devices[0]}></Device>
    </div>
  );
}
