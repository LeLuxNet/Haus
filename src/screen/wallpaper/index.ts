import wallpaper from "wallpaper";
import { deleteFile, File, saveFile } from "../../file";
import { Plugin } from "../../plugins";
import { State } from "../../state";

export default <Plugin>{
  name: "Wallpaper",
  id: "wallpaper",

  deps: [
    {
      name: "wallpaper",
      version: "4.4.2",
    },
  ],

  create: async ({}, id) => {
    const image = new State<File>({
      set: async (file) => {
        const path = await saveFile(file);
        await wallpaper.set(path);
        await deleteFile(path);
      },
    });

    return {
      id,
      fields: { image },
    };
  },
};
