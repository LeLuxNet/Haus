import React from "react";
import { Settings } from "react-feather";
import Device from "../../interfaces/device";

export default function DevicelistComponent({
  devices,
  name,
}: {
  devices: Device[];
  name: string;
}) {
  return (
    <div className="flex bg-white flex-col p-3 pt-0 rounded-tl-xl rounded-tr-xl">
      <div className="mt-3 border-gray-100 border-b border-solid flex justify-between pb-1">
        <div className="font-semibold text-xl">{name}</div>
        <button className="mr-0.5">
          <Settings />
        </button>
      </div>
      {devices.map((device) => {
        return (
          <div className="w-48 bg-gray-100 mt-3 rounded-md p-3" key={device.id}>
            {device.name}
          </div>
        );
      })}
    </div>
  );
}
