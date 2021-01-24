import { Home, homes } from "./server/home";
import { createApi } from "./server/api";
import { Wallpaper } from "./screen/wallpaper";
import { Color } from "./lighting/color";
const PORT = process.env.PORT || 80;

const main = async () => {
  const app = createApi();

  const w = new Wallpaper("1", 1920, 1080);
  w.image.fill((x, y) => {
    if (((x / 120) | 0) % 2 === ((y / 120) | 0) % 2) {
      return Color.fromRGB(0, 0, 0);
    } else {
      return Color.fromRGB(255, 0, 255);
    }
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  const home = new Home("123", "My Home");
  homes.set(home.id, home);
};

main().catch(console.error);
