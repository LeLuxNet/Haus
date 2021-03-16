import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import TitlebarComponent from "./components/titlebar";
import RoomComponent from "./components/views/room";
import RoomlistComponent from "./components/views/roomlist";
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
    {
      id: 1,
      name: "Bath",
      devices: [
        { id: 0, name: "Smart mirror" },
        { id: 1, name: "Heater" },
      ],
    },
    {
      id: 2,
      name: "Kitchen",
      devices: [
        { id: 0, name: "Thermomix" },
        { id: 1, name: "Oven" },
      ],
    },
    {
      id: 3,
      name: "Garage",
      devices: [
        { id: 0, name: "Door" },
        { id: 1, name: "Lamp" },
      ],
    },
  ];
  const [currentRoom, setCurrentRoom] = React.useState(rooms[0]);
  return (
    <div className="bg-gray-100 w-screen h-screen not-selectable">
      <TitlebarComponent title="LeLuxNet"></TitlebarComponent>
      <div className="grid split">
        <RoomlistComponent
          rooms={rooms}
          changeRoom={setCurrentRoom}
        ></RoomlistComponent>
        <RoomComponent room={rooms[currentRoom.id]}></RoomComponent>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
