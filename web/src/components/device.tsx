import React from "react";
import Device from "../interfaces/device";
export function Device({ device }: { device: Device }) {
  var gradient = {
    background: "radial-gradient(61.5% 91.33% at 96.82% 96.36%, #FFF9C6 0%, rgba(243, 244, 246, var(--tw-bg-opacity)) 100%)"
  }
  return (
    <div className="p-10" style={gradient}>
      <h1 className="text-5xl font-bold">{device.name}</h1>
    </div>
  );
}