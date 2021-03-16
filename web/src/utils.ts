export function getElectron() {
  if (window.require === undefined) return;
  return window.require("electron");
}
