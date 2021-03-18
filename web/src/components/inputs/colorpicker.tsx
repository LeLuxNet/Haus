import React, { useEffect, useState } from "react";
import { VerticalSliderComponent } from "./verticalslider";

export default function ColorPickerComponent() {
  const [brightness, setBrightness] = useState("100");
  var red, green, blue: string;

  let context: CanvasRenderingContext2D | undefined;
  let image = new Image();
  image.src = "/colorpicker.png";

  if (context) context.fillStyle = "rgb(243, 244, 246)";

  useEffect(() => {
    if (context) context.filter = `brightness(${brightness}%)`;
    image.onload = function () {
      context?.clearRect(0, 0, 176, 176);
      context?.drawImage(image, 0, 0, 176, 176);
    };
  });

  function getColors(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    console.log(event);
  }

  return (
    <div className="flex h-44 w-72 justify-between">
      <canvas
        width="176"
        height="176"
        onClick={(event) => getColors(event)}
        ref={(r) => (context = r?.getContext("2d") || undefined)}
      />

      <VerticalSliderComponent
        topColor="#FFF"
        middleColor="#888"
        bottomColor="#000"
        value={brightness}
        onChange={setBrightness}
      />

      <ColorIndicator color="#F00" />
    </div>
  );
}

function ColorIndicator({ color }: { color: string }) {
  return (
    <div
      style={{ background: color }}
      className="shadow h-44 w-10 rounded-xl"
    ></div>
  );
}
