import React, { useEffect, useState } from "react";
import { VerticalSliderComponent } from "./verticalslider";

export default function ColorPickerComponent() {
  const [brightness, setBrightness] = useState("100");
  const [color, setColor]: [
    [number, number, number],
    (color: [number, number, number]) => void
  ] = useState([255, 255, 255]); // RGB

  let context: CanvasRenderingContext2D | undefined;
  let image = new Image();
  image.src = "/colorpicker.png";

  useEffect(() => {
    if (context) context.filter = `brightness(${brightness}%)`;
    image.onload = function () {
      context?.clearRect(0, 0, 176, 176);
      context?.drawImage(image, 0, 0, 176, 176);
    };
  }, [brightness]);

  function getColors(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    var x;
    var y;
    if (event.pageX || event.pageY) {
      x = event.pageX;
      y = event.pageY;
    } else {
      x =
        event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      y =
        event.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    x -= (event.target as HTMLCanvasElement).offsetLeft;
    y -= (event.target as HTMLCanvasElement).offsetTop;
    var colorData = context?.getImageData(x, y, 1, 1).data;
    if (colorData) {
      setColor([colorData[0], colorData[1], colorData[2]]);
      console.log(color);
    }
  }

  return (
    <div className="flex h-44 w-72 justify-between">
      <canvas
        width="176"
        height="176"
        className="rounded-50pc cursor-crosshair"
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

      <ColorIndicator color={color} />
    </div>
  );
}

function ColorIndicator({ color }: { color: [number, number, number] }) {
  return (
    <div
      style={{ background: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}
      className="shadow h-44 w-10 rounded-xl"
    ></div>
  );
}
