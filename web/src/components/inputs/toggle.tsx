import React from "react";
import { Check, X } from "react-feather";

export default function ToggleComponent({
  state,
  changeState,
}: {
  state: boolean;
  changeState: (activated: boolean) => void;
}) {
  return (
    <button
      onClick={() => changeState(!state)}
      className="pl-0.5 rounded-full bg-white border-2 border-solid border-gray-300 w-12 h-8"
    >
      <div
        className={`m-0.5 w-6 h-6 rounded-50pc p-0.5 transition-slide ${
          state ? "bg-green-600 ml-4" : "bg-red-600 ml-0"
        }`}
      >
        {state ? (
          <Check color="white" width="20" height="20" />
        ) : (
          <X color="white" width="20" height="20" />
        )}
      </div>
    </button>
  );
}
