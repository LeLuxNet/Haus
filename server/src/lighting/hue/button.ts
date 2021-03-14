import { AxiosInstance } from "axios";
import { UPDATE_BUTTON } from "../../const";
import { Press } from "../../sensors/button";
import { Trigger } from "../../trigger";

export class HueButton extends Trigger<Press> {
  private lastUpdated: string;

  constructor(state: any, id: string, api: AxiosInstance) {
    super();
    this.lastUpdated = state.lastupdated;
    setInterval(async () => {
      const res = await api.get(`sensors/${id}`);
      if (res.data.state.lastupdated !== this.lastUpdated) {
        this.lastUpdated = res.data.state.lastupdated;
        console.log(res.data.state.buttonevent);
      }
    }, UPDATE_BUTTON * 1000);
  }
}
