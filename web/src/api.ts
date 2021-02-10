import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:31313/home/123" });

export interface Device {
  id: number;
  name: string;
  data: { [key: string]: any };
}

export async function getDevices() {
  const res = await api.get<Device[]>("devices");
  return res.data;
}

export async function getDevice(id: number) {
  const res = await api.get<Device>(`device/${id}`);
  return res.data;
}

export async function updateDevice(id: number, data: any) {
  await api.put(`device/${id}`, data);
}
