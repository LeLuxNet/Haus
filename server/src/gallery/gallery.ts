import { Image } from "./image";

export abstract class Gallery {
  abstract load(): Promise<Image>;
}
