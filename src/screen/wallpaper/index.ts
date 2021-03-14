import { promises } from "fs";
import wallpaper from "wallpaper";
import { File, saveFile } from "../../file";
import { Plugin } from "../../plugins";
import { State } from "../../state";

export default <Plugin>{
  name: "Wallpaper",
  id: "wallpaper",

  create: async ({}, id) => {
    const image = new State<File>({
      set: async (file) => {
        const path = await saveFile(file);
        await wallpaper.set(path);
        await promises.unlink(path);
      },
    });

    return {
      id,
      fields: { image },
    };
  },
};
