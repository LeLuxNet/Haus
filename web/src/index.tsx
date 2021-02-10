import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Device, getDevices } from "./api";
import { DeviceComponent } from "./components/device";

const devPromise = getDevices();

function App() {
  const [devices, setDevices] = useState<Device[]>([]);

  devPromise.then(setDevices);

  return (
    <div>
      <h1>Haus</h1>
      <div>
        {devices.map((d) => (
          <DeviceComponent dev={d} key={d.id} />
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
