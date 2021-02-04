import sharp from "sharp";
import { promisify } from "util";
import wallpaper from "wallpaper";
import { Platform } from "../../platform";
import { Screen } from "../screen";
import fs from "fs";
import { Home } from "../../server/home";

export class Wallpaper extends Platform {
  image: Screen;

  constructor(id: string, home: Home, width: number, height: number) {
    super(id, home);
    this.image = new Screen(
      this.home.getDeviceId(this),
      this,
      width,
      height,
      () => this.update()
    );

    // this.update();
  }

  async devices() {
    return [this.image];
  }

  async update() {
    // No need to clear the memory as it will be completly overwritten anyways
    const buffer = Buffer.allocUnsafe(this.image.width * this.image.height * 3);

    for (let x = 0; x < this.image.width; x++) {
      for (let y = 0; y < this.image.height; y++) {
        const [r, g, b] = this.image.pixels[x][y].last!.toRGB();
        const i = (y * this.image.width + x) * 3;

        buffer[i] = r;
        buffer[i + 1] = g;
        buffer[i + 2] = b;
      }
    }

    const img = sharp(buffer, {
      raw: {
        width: this.image.width,
        height: this.image.height,
        channels: 3,
      },
    });

    const name = "wallpaper.png";
    await img.toFile(name);

    await wallpaper.set(name);

    // Can be replaced by "fs/promise" when electron updates to node v12.19
    const unlink = promisify(fs.unlink);
    await unlink(name);
  }
}
