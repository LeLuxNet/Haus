import express from "express";
import { Color } from "./lighting/color";
import { Nanoleaf } from "./lighting/nanoleaf";
import { Razer } from "./lighting/razer";

const PORT = process.env.PORT || 80;

const main = async () => {
  const app = express();

  const razer = await Razer.create();

  // const nanoleaf1 = new Nanoleaf("", "");
  // const nanoleaf2 = new Nanoleaf("", "");

  console.log(Color.chroma(0.8, 1, 75).toRGB());

  setTimeout(() => {
    var offset = 0;
    setInterval(() => {
      offset += 0.1;

      const iMult = (2 * Math.PI) / 20;

      const a = Color.chroma(offset / 100, 1, 75);
      const b = Color.chroma(offset / 100 - 0.5, 1, 75);

      const mix = (i: number) =>
        Color.mix(a, b, Math.sin(offset + iMult * i) / 2 + 0.5);

      const left = mix(2);
      const middle = mix(7);
      const right = mix(12);

      // console.log(left.toRGB());

      razer.headset.left.set!(left);
      razer.headset.right.set!(right);
      razer.mouse.logo.set!(middle);

      for (let i = 0; i < 15; i++) {
        razer.mousepad.leds[i].set!(mix(i));
      }

      // nanoleaf1.global.color.set!(left);
      // nanoleaf2.global.color.set!(right);
    }, 100);
  }, 3000);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

main().catch(console.error);
