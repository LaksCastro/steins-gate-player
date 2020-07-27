import { StateManager } from "./stateManager";
import Logic, { LogicObject } from "./logic";
import Engine, { EngineObject } from "./engine";

export type Main = {
  start: () => void;
  restart: () => void;
};

export default function Main(): Main {
  const stateManager: StateManager = this;

  function start(): void {
    stateManager.createInstance<LogicObject>("logic", Logic.call(stateManager));
    stateManager.createInstance<EngineObject>(
      "engine",
      Engine.call(stateManager)
    );

    const engine = stateManager.getInstance<EngineObject>("engine");
    engine.getState().start();
  }

  function restart(): void {}

  const self: Main = {
    start,
    restart,
  };

  return Object.freeze(self);
}
