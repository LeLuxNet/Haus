import React from "react";

export default function TitlebarComponent({ title }: { title: string }) {
  return (
    <div className="w-screen h-8 bg-gray-100 flex justify-between items-center pl-3 grid-cols-2 draggable">
      <div className="arcade text-xs">{title}</div>
      <div className="flex not-draggable"></div>
    </div>
  );
}
