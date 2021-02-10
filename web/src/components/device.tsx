import React, { Component, useEffect, useState } from "react";
import { Device, updateDevice } from "../api";

export function DeviceComponent({ dev }: { dev: Device }) {
  return (
    <div>
      <h2>{dev.name}</h2>
      <div>
        {Object.entries(dev.data).map(([key, val]) => (
          <div key={key}>
            <span>{key}: </span>
            <Value dev={dev} name={key} data={val} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Value({ dev, name, data }: { dev: Device; name: string; data: any }) {
  const [d, setData] = useState(data);
  useEffect(() => {
    updateDevice(dev.id, { [name]: d });
  }, [d]);

  switch (typeof data) {
    case "boolean":
      return <button onClick={() => setData(!d)}>{d ? "On" : "Off"}</button>;

    case "number":
      return (
        <input
          type="number"
          value={d}
          onChange={(e) => setData(e.target.value)}
        />
      );

    case "object":
      return (
        <input
          type="color"
          value={rgbToHex(d)}
          onChange={(e) =>
            updateDevice(dev.id, { [name]: hexToRgb(e.target.value) })
          }
        />
      );
  }

  throw "";
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const c = (c: number) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  return "#" + c(r) + c(g) + c(b);
}

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
