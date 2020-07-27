import { StateManager } from "./stateManager";
import { ViewportObject } from "./viewport";
import WaveLine, { WaveLineObject } from "./waveLine";
import Point, { createPointFrom } from "./point";

export type WaveFormObject = {
  calculateConstants: () => void;
  getWaveLines: () => WaveLineObject[];
  setWaveLines: (index: number, value: WaveLineObject) => void;
  recalculate: () => void;
  populateArray: () => void;
};

export default function WaveForm(): WaveFormObject {
  const stateManager: StateManager = this;

  const viewport = stateManager.getInstance<ViewportObject>("viewport");
  const linesPadding = 4;

  let lines: WaveLineObject[] = [];
  let linesLength = 32;
  let linesWidth = null;

  function populateArray(): void {
    for (let i = 0; i < linesLength; i++) {
      const y = viewport.getState().getSize().height;
      const x = i * linesWidth + i * linesPadding + linesPadding;

      lines[i] = WaveLine({
        color: "rgb(255,255,255)",
        width: linesWidth,
        height: 0,
        coordinates: Point(createPointFrom(x, y)),
      });
    }
  }

  function calculateConstants(): void {
    const currentViewportState = viewport.getState();

    const { width } = currentViewportState.getSize();

    linesWidth = width / (linesLength + linesPadding);
  }

  function getWaveLines(): WaveLineObject[] {
    return lines;
  }

  function setWaveLines(index: number, value: WaveLineObject): void {
    lines[index] = value;
  }

  function recalculate(): void {
    calculateConstants();

    populateArray();
  }

  const self: WaveFormObject = {
    calculateConstants,
    getWaveLines,
    setWaveLines,
    recalculate,
    populateArray,
  };

  return Object.freeze(self);
}
