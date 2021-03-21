import { Color } from "../lighting/color";
import { Light } from "../lighting/light";
import { ColorState } from "../lighting/state";
import { Platform } from "../platform";
import { Plugin } from "../plugins";
import { State } from "../state";

export default <Plugin>{
  name: "Debug Devices",

  create: async ({}, id, home, logger) => {
    const lightOn = new State<boolean>({
      initial: true,
      set: async (val) => {
        logger.debug(`Turned light ${val ? "on" : "off"}`);
      },
    });

    return new Platform(id, home, logger, async (platform) => [
      new Light(
        home.getDeviceId(platform),
        platform,
        lightOn,
        new ColorState({
          initial: Color.fromRGB(0, 0, 0),
          set: async (val) => {
            const [r, g, b] = val.toRGB();
            logger.debug(`Set light color to ${val}`);
            if (r >= 200) {
              lightOn.update(false);
              logger.debug("Light got turned off externally");
            }
          },
        })
      ),
    ]);
  },
};
