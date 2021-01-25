import { Home, homes } from "./home";
import { createApi } from "./api";
import { Wallpaper } from "../screen/wallpaper";
import { Color } from "../lighting/color";

export function startServer(port: string | number) {
  console.log("Starting server");

  const app = createApi();

  // tmp
  const w = new Wallpaper("1", 1920, 1080);
  w.image.fill((x, y) => {
    if (((x / 120) | 0) % 2 === ((y / 120) | 0) % 2) {
      return Color.fromRGB(0, 0, 0);
    } else {
      return Color.fromRGB(255, 0, 255);
    }
  });

  // tmp
  const home = new Home("123", "My Home");
  homes.set(home.id, home);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
