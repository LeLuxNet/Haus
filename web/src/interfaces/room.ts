import Device from "./device";

export default interface Room {
  name: string;
  id: number;
  devices: Device[];
}
