import React from "react";
export default function BoxComponent({
  title,
  content,
}: {
  title: string;
  content: any;
}) {
  return (
    <div>
      <div className="uppercase text-gray-600 font-bold text-xs">{title}</div>
      <div className="bg-white shadow-md rounded-lg p-4">{content}</div>
    </div>
  );
}
