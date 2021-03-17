import React, { useState } from "react";
import { Copy, Minus, Square, X } from "react-feather";
import { App } from "../app";

export default function TitlebarComponent({ title, name }: { title: string, name: string }) {
  const app = window.app;

  return (
    <div className="w-screen h-8 flex justify-between items-center pl-3 grid-cols-2 draggable">
      <div className="flex text-xs">
        <div className="arcade mr-2">{title}</div>
        <div>{name}</div>
      </div>
      {app && <WindowControls app={app} />}
    </div>
  );
}

function WindowControls({ app }: { app: App }) {
  const [maximised, setMaximised] = useState<boolean>(false);
  app.on("maximize", setMaximised);

  return (
    <div className="flex not-draggable h-full">
      <button
        onClick={() => app.call("minimize")}
        className="w-12 h-full flex place-items-center justify-center p-0 hover:bg-gray-300"
      >
        <Minus className="w-5 h-5" />
      </button>

      <button
        onClick={() => app.call("maximize")}
        className="w-12 h-full flex place-items-center justify-center p-0 hover:bg-gray-300"
      >
        {maximised ? (
          <Copy className="w-4 h-4" />
        ) : (
          <Square className="w-4 h-4" />
        )}
      </button>

      <button
        onClick={() => app.call("close")}
        className="w-12 h-full flex place-items-center justify-center p-0 bg-red-600 text-white hover:bg-red-800"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
