import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import RoomComponent from "./components/room";
import RoomlistComponent from "./components/roomlist";
import TitlebarComponent from "./components/titlebar";
import "./style.css";

declare global {
  interface Window {
    app?: App;
  }
}

function App() {
  // tmp
  const rooms = [
    {
      id: 0,
      name: "Living room",
      devices: [
        { id: 0, name: "Table lamp" },
        { id: 1, name: "TV" },
        { id: 2, name: "Fish tank" },
      ],
    },
    { id: 1, name: "Bath", devices: [] },
    { id: 2, name: "Kitchen", devices: [] },
    { id: 3, name: "Garage", devices: [] },
  ];

  return (
    <div className="bg-gray-100 w-screen h-screen not-selectable">
      <TitlebarComponent title="LeLuxNet"></TitlebarComponent>
      <div className="grid split">
        <RoomlistComponent rooms={rooms}></RoomlistComponent>
        <RoomComponent room={rooms[0]}></RoomComponent>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
