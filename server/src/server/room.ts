import { Field, Int, ObjectType } from "type-graphql";
import { Device } from "../device";
import { Home } from "./home";

@ObjectType()
export class Room {
  @Field(() => Int)
  id!: number;

  @Field()
  name: string;

  devices: number[];

  home: Home;

  @Field(() => [Device], { name: "devices" })
  allDevices() {
    return this.devices.map((i) => this.home.devices[i]);
  }

  constructor(name: string, home: Home, devices: number[]) {
    this.name = name;
    this.home = home;
    this.devices = devices;
  }
}
