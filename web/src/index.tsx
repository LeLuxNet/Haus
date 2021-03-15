import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Device, getDevices } from "./api";
import { RoomComponent } from "./components/room";
import { RoomlistComponent } from "./components/roomlist";
import TitlebarComponent from "./components/titlebar";

const devPromise = getDevices();

function App() {
  const [devices, setDevices] = useState<Device[]>([]);

  devPromise.then(setDevices);

  // tmp
  const rooms = [
    {
      id: 0,
      name: "Living room",
      devices: [
        { id: 0, name: "Table lamp" },
        { id: 0, name: "TV" },
        { id: 0, name: "Fish tank" },
      ],
    },
    { id: 1, name: "Bath", devices: [] },
    { id: 2, name: "Kitchen", devices: [] },
    { id: 3, name: "Garage", devices: [] },
  ];

  return (
    <div className="bg-gray-100 w-screen h-screen">
      <TitlebarComponent title="LeLuxNet"></TitlebarComponent>
      <div className="grid main-grid">
        <RoomlistComponent rooms={rooms}></RoomlistComponent>
        <RoomComponent room={rooms[0]}></RoomComponent>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
