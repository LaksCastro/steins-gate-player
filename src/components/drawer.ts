import { StateManager } from "./stateManager";
import { CanvasObject } from "./canvas";
import { ViewportObject } from "./viewport";
import { WaveFormObject } from "./waveForm";

export type DrawerObject = {
  fill: () => void;
  clear: () => void;
};

export default function Drawer(): DrawerObject {
  const stateManager: StateManager = this;

  const viewport = stateManager.getInstance<ViewportObject>("viewport");
  const canvas = stateManager.getInstance<CanvasObject>("canvas");
  const waveForm = stateManager.getInstance<WaveFormObject>("waveForm");

  function fill(): void {
    const ctx = canvas.getState().getCtx();

    const lines = waveForm.getState().getWaveLines();

    for (const line of lines) {
      ctx.beginPath();

      const { color, coordinates, width, height } = line.getAttributes();
      const { x, y } = coordinates.getCoordinates();

      ctx.fillStyle = color;
      ctx.rect(x, y, width, height);

      ctx.closePath();
    }

    ctx.fill();
  }

  function clear(): void {
    const viewportSize = viewport.getState().getSize();
    const ctx = canvas.getState().getCtx();

    ctx.clearRect(0, 0, viewportSize.width, viewportSize.height);
  }

  const self: DrawerObject = {
    fill,
    clear,
  };

  return Object.freeze(self);
}
