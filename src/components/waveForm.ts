import { StateManager } from "./stateManager";
import { ViewportObject } from "./viewport";
import WaveLine, { WaveLineObject } from "./waveLine";
import Point, { createPointFrom } from "./point";

export type WaveFormObject = {
  calculateConstants: () => void;
  getWaveLines: () => WaveLineObject[];
  setWaveLines: (index: number, value: WaveLineObject) => void;
  recalculate: () => void;
};

export default function WaveForm(): WaveFormObject {
  const stateManager: StateManager = this;

  const viewport = stateManager.getInstance<ViewportObject>("viewport");

  const linesPadding = 12;

  let lines: WaveLineObject[] = [];
  let linesLength = null;
  let linesWidth = null;

  function populateArray(): void {
    for (let i = 0; i < linesLength; i++) {
      const y = 0;
      const x = i * linesWidth + i * linesPadding;

      lines[i] = WaveLine({
        color: "#fff",
        width: linesWidth,
        height: 0,
        coordinates: Point(createPointFrom(x, y)),
      });
    }
  }

  function calculateConstants(): void {
    lines = [];

    const currentViewportState = viewport.getState();

    const { width } = currentViewportState.getSize();

    linesWidth = width / 50;

    linesLength = width / (linesWidth + linesPadding);
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
  };

  return Object.freeze(self);
}
