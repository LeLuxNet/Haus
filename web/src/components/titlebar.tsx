import React, { useState } from "react";
export default function DevicelistComponent({ title }: { title: string}) {
  const currentWindow = window.require("electron").remote.getCurrentWindow();
  function close() {
    currentWindow.close();
  }
  function minimize() {
    currentWindow.minimize();
  }
  function toggleFullscreen() {
    currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize();
  }
  return (
    <div className="w-screen h-8 flex justify-between items-center pl-3 grid-cols-2 draggable">
      <div className="arcade text-xs">{ title }</div>
      <div className="flex not-draggable h-full">
        <button onClick={minimize} className="w-12 h-full flex place-items-center justify-center p-0 hover:bg-gray-300"><img src="./dist/icons/minus.svg" className="w-5 h-5" /></button>
        <button onClick={toggleFullscreen} className="w-12 h-full flex place-items-center justify-center p-0 hover:bg-gray-300">
          <img src="./dist/icons/square.svg" className="w-4 h-4" />
        </button>
        <button onClick={close} className="w-12 h-full bg-red-600 text-white flex place-items-center justify-center p-0 hover:bg-red-800"><img src="./dist/icons/x.svg" className="w-5 h-5" /></button>
      </div>
    </div>
  );
}
