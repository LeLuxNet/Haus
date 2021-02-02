export type Press = PressDown | PressUp | PressRelease;

interface PressDown {
  button: number;
  action: "down";
}

interface PressUp {
  button: number;
  action: "up";

  hold: boolean;
}

interface PressRelease {
  button: number;
  action: "release";

  hold: boolean;
}
