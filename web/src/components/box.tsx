import React from "react";
export default function BoxComponent({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) {
  return (
    <div>
      <div className="uppercase text-gray-600 font-bold text-xs">{title}</div>
      <div className="bg-white shadow-md rounded-lg p-4">{children}</div>
    </div>
  );
}
