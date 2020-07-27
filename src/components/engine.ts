import RequestFrame from "./requestFrame";
import { StateManager } from "./stateManager";
import { DrawerObject } from "./drawer";
import { LogicObject } from "./logic";

export type EngineObject = {
  start: () => void;
};

export default function Engine(): EngineObject {
  const stateManager: StateManager = this;

  const frames = RequestFrame(update);

  const drawer = stateManager.getInstance<DrawerObject>("drawer");
  const logic = stateManager.getInstance<LogicObject>("drawer");

  function start(): void {
    drawer.getState().fill();

    logic.getState().update();

    frames.start();
  }

  function update(): void {
    drawer.getState().clear();

    drawer.getState().fill();

    logic.getState().update();
  }

  const self: EngineObject = {
    start,
  };

  return Object.freeze(self);
}
