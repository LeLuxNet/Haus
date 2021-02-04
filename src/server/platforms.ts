import { PhilipsHue } from "../lighting/hue";
import { Nanoleaf } from "../lighting/nanoleaf";
import { Razer } from "../lighting/razer";
import { Platform } from "../platform";
import { Home } from "./home";

export interface PlatformData {
  type: string;
  [key: string]: string;
}

export async function createPlatform(
  id: string,
  home: Home,
  data: PlatformData
): Promise<Platform | undefined> {
  switch (data.type) {
    case "nanoleaf": {
      if (data.key === undefined) {
        return Nanoleaf.link(data.host, id, home);
      } else {
        return new Nanoleaf(data.host, data.key, id, home);
      }
    }
    case "philips-hue": {
      if (data.key === undefined) {
        return PhilipsHue.link(data.host, id, home);
      } else {
        return new PhilipsHue(data.host, data.key, id, home);
      }
    }
    case "razer": {
      return Razer.create(id, home);
    }
  }

  return undefined;
}
