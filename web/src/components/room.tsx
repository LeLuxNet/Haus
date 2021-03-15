import React from "react";
import Room from "../interfaces/room";
import { Device } from "./device";
import { DevicelistComponent } from "./devicelist";
export function RoomComponent({ room }: { room: Room }) {
  return (
    <div className="h-auto grid split">
      <DevicelistComponent devices={[{id: 0, name: "test"}, {id: 1, name: "test"}, {id: 2, name: "test"}]}></DevicelistComponent>
      <Device device={{id: 0, name: "Deckenlampe"}}></Device>
    </div>
  );
}
