import React from "react";
import ReactDOM from "react-dom";
import RoomComponent from "./components/room";
import RoomlistComponent from "./components/roomlist";
import TitlebarComponent from "./components/titlebar";

function App() {
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
