<<<<<<< HEAD
import { promises } from "fs";
=======
>>>>>>> 126b1d59fc3196c57744450598f4055c9de5b710
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
<<<<<<< HEAD
        await promises.unlink(path);
=======
        await deleteFile(path);
>>>>>>> 126b1d59fc3196c57744450598f4055c9de5b710
      },
    });

    return {
      id,
      fields: { image },
    };
  },
};
