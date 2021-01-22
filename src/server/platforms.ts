import { PhilipsHue } from "../lighting/hue";
import { Nanoleaf } from "../lighting/nanoleaf";
import { Razer } from "../lighting/razer";
import { Platform } from "../platform";

export async function createPlatform(
  name: string,
  id: string,
  data: any
): Promise<Platform | undefined> {
  switch (name) {
    case "nanoleaf": {
      if (data.key === undefined) {
        return Nanoleaf.link(data.host, id);
      } else {
        return new Nanoleaf(data.host, data.key, id);
      }
    }
    case "philips-hue": {
      if (data.key === undefined) {
        return PhilipsHue.link(data.host, id);
      } else {
        return new PhilipsHue(data.host, data.key, id);
      }
    }
    case "razer": {
      return Razer.create(id);
    }
  }

  return undefined;
}
