import React from "react";
import Device from "../../interfaces/device";

export default function Device({ device }: { device: Device }) {
  var gradient = {
    background:
      "transparent" /*"radial-gradient(61.5% 91.33% at 96.82% 96.36%, #FFF9C6 0%, rgba(243, 244, 246, var(--tw-bg-opacity)) 100%)"*/,
  };
  return (
    <div className="p-10" style={gradient}>
      <div className="flex mb-2">
        <h1 className="text-5xl font-bold">{device.name}</h1>
        <button className=""></button>
      </div>
      <p className="text-gray-700">Status: an</p>
      <div className="grid"></div>
    </div>
  );
}
