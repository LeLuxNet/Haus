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

  return (
    <div className="bg-gray-100 w-screen h-screen not-selectable">
      <TitlebarComponent title="LeLuxNet"></TitlebarComponent>
      <div className="grid split">
        <RoomlistComponent rooms={[{id: 0, name: "test", devices: []}, {id: 1, name: "test", devices: []}, {id: 2, name: "test", devices: []}, {id: 3, name: "test", devices: []}]}></RoomlistComponent>
        <RoomComponent room={{name: "test", id: 0, devices: []}}></RoomComponent>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
