import { Home, homes } from "./home";
import { createApi } from "./api";

export function startServer(port: string | number) {
  console.log("Starting server");

  const app = createApi();

  // tmp
  const home = new Home("123", "My Home");
  homes.set(home.id, home);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
