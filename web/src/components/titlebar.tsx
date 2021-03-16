import React from "react";
import { Minus, Square, X } from "react-feather";

export default function DevicelistComponent({ title }: { title: string }) {
  const app = window.app;

  return (
    <div className="w-screen h-8 flex justify-between items-center pl-3 grid-cols-2 draggable">
      <div className="arcade text-xs">{title}</div>

      {app && (
        <div className="flex not-draggable h-full">
          <button
            onClick={app.minimize}
            className="w-12 h-full flex place-items-center justify-center p-0 hover:bg-gray-300"
          >
            <Minus className="w-5 h-5" />
          </button>

          <button
            onClick={app.toggleMaximize}
            className="w-12 h-full flex place-items-center justify-center p-0 hover:bg-gray-300"
          >
            <Square className="w-5 h-5" />
          </button>

          <button
            onClick={app.close}
            className="w-12 h-full flex place-items-center justify-center p-0 bg-red-600 text-white hover:bg-red-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
