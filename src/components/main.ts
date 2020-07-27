import { StateManager } from "./stateManager";
import Logic, { LogicObject } from "./logic";
import Engine, { EngineObject } from "./engine";
import WebAudioContext, { WebAudioContextObject } from "./webAudioContext";
import { PlayerObject } from "./player";
import WaveForm, { WaveFormObject } from "./waveForm";
import Drawer, { DrawerObject } from "./drawer";
import { CanvasObject } from "./canvas";

export type MainObject = {
  start: () => void;
  restart: () => void;
};

export default function Main(): MainObject {
  const stateManager: StateManager = this;

  function start(): void {
    const webAudioContext: WebAudioContextObject = WebAudioContext.call(
      stateManager
    );
    stateManager.createInstance<WebAudioContextObject>(
      "webAudioContext",
      webAudioContext
    );

    const waveForm: WaveFormObject = WaveForm.call(stateManager);
    waveForm.calculateConstants();
    waveForm.populateArray();
    stateManager.createInstance<WaveFormObject>("waveForm", waveForm);

    const logic: LogicObject = Logic.call(stateManager);
    stateManager.createInstance<LogicObject>("logic", logic);

    const drawer: DrawerObject = Drawer.call(stateManager);
    stateManager.createInstance<DrawerObject>("drawer", drawer);

    const engine: EngineObject = Engine.call(stateManager);
    stateManager.createInstance<EngineObject>("engine", engine);

    webAudioContext.defineListener(onCanPlay);
    webAudioContext.start();
  }

  function onCanPlay(): void {
    const engine = stateManager.getInstance<EngineObject>("engine");
    const player = stateManager.getInstance<PlayerObject>("player");

    player.getState().play();
    engine.getState().start();
  }

  function restart(): void {
    const waveForm = stateManager.getInstance<WaveFormObject>("waveForm");
    waveForm.getState().recalculate();

    const canvas = stateManager.getInstance<CanvasObject>("canvas");
    canvas.getState().defineCanvas();
  }

  const self: MainObject = {
    start,
    restart,
  };

  return Object.freeze(self);
}
