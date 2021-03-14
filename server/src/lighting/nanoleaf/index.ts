import axios from "axios";
import { Plugin } from "../../plugins";
import { State } from "../../state";
import { Color } from "../color";
import { Light } from "../light";
import { Lighting } from "../lighting";
import { ColorState } from "../state";

const briMult = 100 / 255;
const satMult = 100 / 255;

const sizeMult = 0.24;

// https://forum.nanoleaf.me/docs

export default <Plugin>{
  name: "Nanoleaf",
  id: "nanoleaf",

  create: async ({ host, key }, id, home, logger) => {
    const api = axios.create({
      baseURL: `${host}/api/v1/${key}`,
    });

    return new Lighting(id, home, logger, async (platform) => [
      new Light(
        home.getDeviceId(platform),
        platform,
        new State({
          get: () => api.get(`state/on`).then((res) => res.data.value),
          set: (val) => api.put("state", { on: { value: val } }),
        }),

        new ColorState({
          get: () =>
            api
              .get(`state`)
              .then((res) =>
                Color.fromHSV(
                  res.data.hue.value,
                  res.data.brightness / briMult,
                  res.data.sat / satMult
                )
              ),
          set: (val) => {
            const [h, s, v] = val.toHSV();
            return api.put("state", {
              hue: { value: h },
              sat: { value: Math.round(s * satMult) },
              brightness: { value: Math.round(v * briMult) },
            });
          },
          fadeEffect: (from, to, t) => {
            const palette = [from];
            const keyframes = Math.ceil(t / 60);

            for (let i = 1; i <= keyframes; i++) {
              palette[i] = Color.mix(from, to, i / keyframes);
            }

            api.put("effects", {
              write: {
                command: "display",
                version: "1.0",
                animType: "fade",
                colorType: "HSB",

                transTime: Math.round((t * 10) / keyframes),
                loop: false,
                delayTime: 0,

                palette: palette.map((c) => {
                  const [h, s, b] = c.toHSV();
                  return {
                    hue: h,
                    saturation: s * satMult,
                    brightness: b * briMult,
                  };
                }),
              },
            });
          },
        })
      ),
    ]);
  },
};
