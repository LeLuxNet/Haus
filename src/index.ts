import { Home, homes } from "./server/home";
import { createApi } from "./server/api";

const PORT = process.env.PORT || 80;

const main = async () => {
  const app = createApi();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  const home = new Home("123", "My Home");
  homes.set(home.id, home);
};

main().catch(console.error);
