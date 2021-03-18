import React from "react";
export function VerticalSliderComponent({
  topColor,
  middleColor,
  bottomColor,
  value,
  onChange,
}: {
  topColor: string;
  middleColor: string;
  bottomColor: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const gradient = {
    background: `linear-gradient(to right, ${bottomColor} 0%, ${middleColor} 50%, ${topColor} 95%)`,
  };
  return (
    <div className="vertical-slider h-44 w-10">
      <input
        className="border-none rounded-xl w-44 h-10 transform -rotate-90 appearance-none"
        type="range"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        min="0"
        max="100"
        style={gradient}
      />
    </div>
  );
}
