import React from "react";
import Room from "../../interfaces/room";
import Device from "./device";
import DevicelistComponent from "./devicelist";

export default function RoomComponent({ room }: { room: Room }) {
  const [currentDevice, setCurrentDevice] = React.useState(room.devices[0]);
  return (
    <div className="h-auto grid split">
      <DevicelistComponent
        name={room.name}
        devices={room.devices}
        changeDevice={setCurrentDevice}
      ></DevicelistComponent>
      <Device device={currentDevice}></Device>
    </div>
  );
}
