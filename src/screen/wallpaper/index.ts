import sharp from "sharp";
import wallpaper from "wallpaper";
import { Platform } from "../../platform";
import { Screen } from "../screen";

export class Wallpaper extends Platform {
  image: Screen;
  _buffer: Buffer;

  constructor(id: string, width: number, height: number) {
    super(id);
    this.image = new Screen(this, width, height, () => this.update());
    this._buffer = Buffer.alloc(this.image.width * this.image.height * 3);

    // this.update();
  }

  async devices() {
    return [this.image];
  }

  async update() {
    for (let x = 0; x < this.image.width; x++) {
      for (let y = 0; y < this.image.height; y++) {
        const [r, g, b] = this.image.pixels[x][y].last!.toRGB();
        const i = (y * this.image.width + x) * 3;

        this._buffer[i] = r;
        this._buffer[i + 1] = g;
        this._buffer[i + 2] = b;
      }
    }

    console.log(this._buffer);

    const img = sharp(this._buffer, {
      raw: {
        width: this.image.width,
        height: this.image.height,
        channels: 3,
      },
    });

    const name = "wallpaper.png";
    await img.toFile(name);

    await wallpaper.set(name);
  }
}
