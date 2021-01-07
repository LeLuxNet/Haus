export interface HueLight {
  state: HueLightState;

  swupdate: Update;

  type: string;
  name: string;
  modelid: string;
  manufacturername: string;

  productname: string;

  capabilities: {
    certified: boolean;
    control: {
      mindimlevel?: number;
      maxlumen?: number;

      colorgamuttype?: string;
      colorgamut?: [number, number][];

      ct?: {
        min: number;
        max: number;
      };
    };
    streaming: {
      renderer: boolean;
      proxy: boolean;
    };
  };

  config: {
    archetype: string;
    function: "functional" | "mixed";
    direction: "omnidirectional";
    startup: {
      mode: "powerfail";
      configured: boolean;
    };
  };

  uniqueid: string;
  swversion: string;
  swconfigid: string;
  productid: string;
}

interface Update {
  state: "noupdates";
  lastinstall: string;
}

export interface HueLightState {
  on: boolean;

  bri?: number;
  hue?: number;
  sat?: number;

  effect?: "none";
  xy?: [number, number];
  ct?: number;

  alert: "select";
  colormode?: "xy";
  mode: "homeautomation";
  reachable: boolean;
}

export interface HueSensor {
  state: HueSensorState;

  swupdate?: Update;

  config: {
    on: boolean;
    battery?: number;

    configured?: boolean;
    reachable?: number;

    alert?: "none";

    tholddark?: number;
    tholdoffset?: number;

    ledindication?: boolean;
    usertest?: boolean;

    sensitivity?: number;
    sensitivitymax?: number;

    sunriseoffset?: number;
    sunsetoffset?: number;

    // pending
  };

  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname?: string;
  diversityid?: string;

  swversion: string;
  uniqueid?: string;
  recycle?: boolean;

  capabilities: {
    certified: boolean;
    primary: boolean;
    inputs?: Input[];
  };
}

interface Input {
  repeatintervals: number[];
  events: Event[];
}

interface Event {
  buttonevent: number;
  eventtype: "initial_press" | "repeat" | "short_release" | "long_release";
}

export interface HueSensorState {
  flag?: boolean;
  status?: number;

  presence?: boolean;

  lightlevel?: number;
  dark?: boolean;
  daylight?: boolean;

  temperature?: number;
  buttonevent?: number;

  lastupdated: string;
}
