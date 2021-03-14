import React from "react";
import Room from "../interfaces/room";
import { DevicelistComponent } from "./devicelist";
export function RoomComponent({ room }: { room: Room }) {
  return (
    <div className="bg-white block w-auto h-auto rounded-tl-xl">
      <DevicelistComponent devices={[{id: 0, name: "test"}, {id: 1, name: "test"}, {id: 2, name: "test"}]}></DevicelistComponent>
    </div>
  );
}