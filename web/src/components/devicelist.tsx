import React from "react";
import Device from "../interfaces/device";

export default function DevicelistComponent({
  devices,
}: {
  devices: Device[];
}) {
  return (
    <div className="flex flex-col p-3 pt-0">
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
