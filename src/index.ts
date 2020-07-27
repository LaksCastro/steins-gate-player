import UserInput from "./components/userInput";
import StateManager from "./components/stateManager";
import Viewport from "./components/viewport";
import Player, { PlayerObject } from "./components/player";
import Main, { MainObject } from "./components/main";
import Canvas, { CanvasObject } from "./components/canvas";

window.addEventListener("DOMContentLoaded", function () {
  const input = UserInput();

  input.onStart(listener);
});

function listener(): void {
  const player = Player(".audio-element");

  addAnimation(".canvas-layer", player);
}

function addAnimation(selector: string, player: PlayerObject): void {
  const stateManager = StateManager();

  stateManager.createInstance("viewport", Viewport(selector));

  const canvas: CanvasObject = Canvas.call(stateManager, selector);
  canvas.defineCanvas();

  stateManager.createInstance("canvas", canvas);
  stateManager.createInstance("player", player);

  const main: MainObject = Main.call(stateManager);
  main.start();

  window.onresize = main.restart;
}
