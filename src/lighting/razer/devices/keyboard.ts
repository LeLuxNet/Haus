import { Razer, toRzColor } from "..";
import { State } from "../../../state";
import { Color } from "../../color";
import { ColorState } from "../../state";
import { RazerDevice } from "../device";

enum Keys {
  ESCAPE = "Escape",

  M1 = "M1",
  M2 = "M2",
  M3 = "M3",
  M4 = "M4",
  M5 = "M5",

  F1 = "F1",
  F2 = "F2",
  F3 = "F3",
  F4 = "F4",
  F5 = "F5",
  F6 = "F6",
  F7 = "F7",
  F8 = "F8",
  F9 = "F9",
  F10 = "F10",
  F11 = "F11",
  F12 = "F12",

  DIGIT0 = "Digit0",
  DIGIT1 = "Digit1",
  DIGIT2 = "Digit2",
  DIGIT3 = "Digit3",
  DIGIT4 = "Digit4",
  DIGIT5 = "Digit5",
  DIGIT6 = "Digit6",
  DIGIT7 = "Digit7",
  DIGIT8 = "Digit8",
  DIGIT9 = "Digit9",

  MINUS = "Minus",
  EQUAL = "Equal",

  TAB = "Tab",

  CAPS_LOCK = "CapsLock",

  SHIFT_LEFT = "ShiftLeft",
  SHIFT_RIGHT = "ShiftRight",

  CONTROL_LEFT = "ControlLeft",
  CONTROL_RIGHT = "ControlRight",

  META_LEFT = "MetaLeft",

  ALT_LEFT = "AltLeft",
  ALT_RIGHT = "AltRight",

  FN = "Fn",

  CONTEXT_MENU = "ContextMenu",

  ARROW_UP = "ArrowUp",
  ARROW_LEFT = "ArrowLeft",
  ARROW_DOWN = "ArrowDown",
  ARROW_RIGHT = "ArrowRight",

  SPACE = "Space",
  BACKSPACE = "Backspace",
  ENTER = "Enter",

  KEY_Q = "KeyQ",
  KEY_W = "KeyW",
  KEY_E = "KeyE",
  KEY_R = "KeyR",
  KEY_T = "KeyT",
  KEY_Y = "KeyY",
  KEY_U = "KeyU",
  KEY_I = "KeyI",
  KEY_O = "KeyO",
  KEY_P = "KeyP",

  KEY_A = "KeyA",
  KEY_S = "KeyS",
  KEY_D = "KeyD",
  KEY_F = "KeyF",
  KEY_G = "KeyG",
  KEY_H = "KeyH",
  KEY_J = "KeyJ",
  KEY_K = "KeyK",
  KEY_L = "KeyL",

  KEY_Z = "KeyZ",
  KEY_X = "KeyX",
  KEY_C = "KeyC",
  KEY_V = "KeyV",
  KEY_B = "KeyB",
  KEY_N = "KeyN",
  KEY_M = "KeyM",

  BACKQUOTE = "Backquote",
  BRACKET_LEFT = "BracketLeft",
  BRACKET_RIGHT = "BracketRight",
  BACKSLASH = "Backslash",
  SEMICOLON = "Semicolon",
  QUOTE = "Quote",
  COMMA = "Comma",
  PERIOD = "Period",
  SLASH = "Slash",

  PRINT_SCREEN = "PrintScreen",
  SCROLL_LOCK = "ScrollLock",
  PAUSE = "Pause",

  INSERT = "Insert",
  HOME = "Home",
  PAGE_UP = "PageUp",

  DELETE = "Delete",
  END = "End",
  PAGE_DOWN = "PageDown",
  NUM_LOCK = "NumLock",

  NUMPAD0 = "Numpad0",
  NUMPAD1 = "Numpad1",
  NUMPAD2 = "Numpad2",
  NUMPAD3 = "Numpad3",
  NUMPAD4 = "Numpad4",
  NUMPAD5 = "Numpad5",
  NUMPAD6 = "Numpad6",
  NUMPAD7 = "Numpad7",
  NUMPAD8 = "Numpad8",
  NUMPAD9 = "Numpad9",

  NUMPAD_DIVIDE = "NumpadDivide",
  NUMPAD_MULTIPLY = "NumpadMultiply",
  NUMPAD_SUBTRACT = "NumpadSubtract",
  NUMPAD_ADD = "NumpadAdd",

  NUMPAD_DECIMAL = "NumpadDecimal",
  NUMPAD_ENTER = "NumpadEnter",
}

export class RazerKeyboard extends RazerDevice {
  keyMap: Map<string, ColorState>;
  keyList: ColorState[];

  constructor(razer: Razer) {
    super(
      razer,
      () =>
        this.razer.api.put("keyboard", {
          effect: "CHROMA_CUSTOM",
          param: [
            [
              0,
              this.keyColor(Keys.ESCAPE),
              0,
              this.keyColor(Keys.F1),
              this.keyColor(Keys.F2),
              this.keyColor(Keys.F3),
              this.keyColor(Keys.F4),
              this.keyColor(Keys.F5),
              this.keyColor(Keys.F6),
              this.keyColor(Keys.F7),
              this.keyColor(Keys.F8),
              this.keyColor(Keys.F9),
              this.keyColor(Keys.F10),
              this.keyColor(Keys.F11),
              this.keyColor(Keys.F12),
              this.keyColor(Keys.PRINT_SCREEN),
              this.keyColor(Keys.SCROLL_LOCK),
              this.keyColor(Keys.PAUSE),
              0,
              0,
              0,
              0,
            ],
            [
              this.keyColor(Keys.M1),
              this.keyColor(Keys.BACKQUOTE),
              this.keyColor(Keys.DIGIT1),
              this.keyColor(Keys.DIGIT2),
              this.keyColor(Keys.DIGIT3),
              this.keyColor(Keys.DIGIT4),
              this.keyColor(Keys.DIGIT5),
              this.keyColor(Keys.DIGIT6),
              this.keyColor(Keys.DIGIT7),
              this.keyColor(Keys.DIGIT8),
              this.keyColor(Keys.DIGIT9),
              this.keyColor(Keys.DIGIT0),
              this.keyColor(Keys.MINUS),
              this.keyColor(Keys.EQUAL),
              this.keyColor(Keys.BACKSPACE),
              this.keyColor(Keys.INSERT),
              this.keyColor(Keys.HOME),
              this.keyColor(Keys.PAGE_UP),
              this.keyColor(Keys.NUM_LOCK),
              this.keyColor(Keys.NUMPAD_DIVIDE),
              this.keyColor(Keys.NUMPAD_MULTIPLY),
              this.keyColor(Keys.NUMPAD_SUBTRACT),
            ],
            [
              this.keyColor(Keys.M2),
              this.keyColor(Keys.TAB),
              this.keyColor(Keys.KEY_Q),
              this.keyColor(Keys.KEY_W),
              this.keyColor(Keys.KEY_E),
              this.keyColor(Keys.KEY_R),
              this.keyColor(Keys.KEY_T),
              this.keyColor(Keys.KEY_Y),
              this.keyColor(Keys.KEY_U),
              this.keyColor(Keys.KEY_I),
              this.keyColor(Keys.KEY_O),
              this.keyColor(Keys.KEY_P),
              this.keyColor(Keys.BRACKET_LEFT),
              this.keyColor(Keys.BRACKET_RIGHT),
              this.keyColor(Keys.BACKSLASH),
              this.keyColor(Keys.DELETE),
              this.keyColor(Keys.END),
              this.keyColor(Keys.PAGE_DOWN),
              this.keyColor(Keys.NUMPAD7),
              this.keyColor(Keys.NUMPAD8),
              this.keyColor(Keys.NUMPAD9),
              this.keyColor(Keys.NUMPAD_ADD),
            ],
            [
              this.keyColor(Keys.M3),
              this.keyColor(Keys.CAPS_LOCK),
              this.keyColor(Keys.KEY_A),
              this.keyColor(Keys.KEY_S),
              this.keyColor(Keys.KEY_D),
              this.keyColor(Keys.KEY_F),
              this.keyColor(Keys.KEY_G),
              this.keyColor(Keys.KEY_H),
              this.keyColor(Keys.KEY_J),
              this.keyColor(Keys.KEY_K),
              this.keyColor(Keys.KEY_L),
              this.keyColor(Keys.SEMICOLON),
              this.keyColor(Keys.QUOTE),
              0,
              this.keyColor(Keys.ENTER),
              0,
              0,
              0,
              this.keyColor(Keys.NUMPAD4),
              this.keyColor(Keys.NUMPAD5),
              this.keyColor(Keys.NUMPAD6),
              0,
            ],
            [
              this.keyColor(Keys.M4),
              this.keyColor(Keys.SHIFT_LEFT),
              0,
              this.keyColor(Keys.KEY_Z),
              this.keyColor(Keys.KEY_X),
              this.keyColor(Keys.KEY_C),
              this.keyColor(Keys.KEY_V),
              this.keyColor(Keys.KEY_B),
              this.keyColor(Keys.KEY_N),
              this.keyColor(Keys.KEY_M),
              this.keyColor(Keys.COMMA),
              this.keyColor(Keys.PERIOD),
              this.keyColor(Keys.SLASH),
              0,
              this.keyColor(Keys.SHIFT_RIGHT),
              0,
              this.keyColor(Keys.ARROW_UP),
              0,
              this.keyColor(Keys.NUMPAD1),
              this.keyColor(Keys.NUMPAD2),
              this.keyColor(Keys.NUMPAD3),
              this.keyColor(Keys.NUMPAD_ENTER),
            ],
            [
              this.keyColor(Keys.M5),
              this.keyColor(Keys.CONTROL_LEFT),
              this.keyColor(Keys.META_LEFT),
              this.keyColor(Keys.ALT_LEFT),
              0,
              0,
              0,
              this.keyColor(Keys.SPACE),
              0,
              0,
              0,
              this.keyColor(Keys.ALT_RIGHT),
              this.keyColor(Keys.FN),
              this.keyColor(Keys.CONTEXT_MENU),
              this.keyColor(Keys.CONTROL_RIGHT),
              this.keyColor(Keys.ARROW_LEFT),
              this.keyColor(Keys.ARROW_DOWN),
              this.keyColor(Keys.ARROW_RIGHT),
              0,
              this.keyColor(Keys.NUMPAD0),
              this.keyColor(Keys.NUMPAD_DECIMAL),
              0,
            ],
          ],
        }),
      "keyboard"
    );

    this.keyMap = new Map();
    this.keyList = [];
    Object.values(Keys).forEach((e) => {
      const key = new ColorState({
        set: async () => {
          this.update.scedule();
        },
      });

      this.keyMap.set(e, key);
      this.keyList.push(key);
    });
  }

  private keyColor(name: string) {
    return toRzColor(this.keyMap.get(name)?.last);
  }
}
