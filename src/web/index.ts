import axios from "axios";

const api = axios.create({ baseURL: "http://localhost/home/123" });

const main = async () => {
  const devices = (await api.get("devices")).data;
};

main().catch(console.error);
