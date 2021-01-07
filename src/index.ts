import express from "express";
import { TweenAnimation } from "./animation/tween";
import { PhilipsHue } from "./lighting/hue";

const PORT = process.env.PORT || 80;

const main = async () => {
  const app = express();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

main().catch(console.error);
