import React from "react";
export function VerticalSlider({ topColor, bottomColor }: { topColor: string, bottomColor: string}) {
  return (
    <div className="p-3 vertical-slider">
      <input type="range" min="0" max="100"/>
    </div>
  );
}