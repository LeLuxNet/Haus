import { Device } from "../device";
import { Platform } from "../platform";

export const homes: Map<string, Home> = new Map();

export class Home {
  id: string;
  name: string;

  platforms: Platform[] = [];
  devices: Device[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
