import React from "react";
import Device from "../../interfaces/device";

export default function DevicelistComponent({
  devices,
  name,
  changeDevice,
}: {
  devices: Device[];
  name: string;
  changeDevice: (device: Device) => void;
}) {
  return (
    <div className="flex bg-white flex-col p-3 pt-0 rounded-tl-xl rounded-tr-xl">
      <div className="mt-3 border-gray-100 border-b border-solid pb-1 font-semibold text-xl">
        {name}
      </div>
      {devices.map((device) => {
        return (
          <button
            onClick={() => changeDevice(device)}
            className="w-48 bg-gray-100 mt-3 rounded-md p-3"
            key={device.id}
          >
            {device.name}
          </button>
        );
      })}
    </div>
  );
}
