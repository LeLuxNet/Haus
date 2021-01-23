import { Home, homes } from "./server/home";
import { createApi } from "./server/api";
import { Color } from "./lighting/color";

const PORT = process.env.PORT || 80;

const main = async () => {
  const app = createApi();

  for (let i = 0; i <= 100; i++) {
    console.log(Color.chroma(i / 100).toString());
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  const home = new Home("123", "My Home");
  homes.set(home.id, home);
};

main().catch(console.error);
