import EtherealColor from "ethereal-color";

import { StateManager } from "./stateManager";
import { WebAudioContextObject } from "./webAudioContext";
import { WaveFormObject } from "./waveForm";
import Point, { createPointFrom } from "./point";
import { ViewportObject } from "./viewport";
import { interpolate } from "./utils";

export type LogicObject = {
  update: () => void;
};

export default function Logic(): LogicObject {
  const stateManager: StateManager = this;

  const { Color, Palette, Gradient } = EtherealColor;

  const waveForm = stateManager.getInstance<WaveFormObject>("waveForm");

  const viewport = stateManager.getInstance<ViewportObject>("viewport");

  const webAudioContext = stateManager.getInstance<WebAudioContextObject>(
    "webAudioContext"
  );

  const palette = Palette([Color("#A53039"), Color("#E7E6EC")]);

  const gradient = Gradient(palette, { count: 32 });
  const colorsArray = (gradient.toObjectArray("rgb") as unknown) as {
    r: number;
    g: number;
    b: number;
  }[];

  const toOpacity = interpolate([0, 255], [0, 1000]);

  function update(): void {
    const { height } = viewport.getState().getSize();

    const toHeight = interpolate([0, 128], [0, height]);

    const api = webAudioContext.getState().getApi();

    const waveFormLines = waveForm.getState().getWaveLines();

    api.analyser.getByteFrequencyData(api.frequencyData);

    for (let i = 0; i < api.frequencyData.length; i++) {
      let frequency = api.frequencyData[i] / 2;

      const currentLine = waveFormLines[i];

      const colorObj = colorsArray[i];

      const colorString = `${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${
        toOpacity(frequency) / 1000
      }`;

      const coordinates = currentLine
        .getAttributes()
        .coordinates.getCoordinates();

      const fixedHeight = toHeight(frequency);

      const newHeight = fixedHeight;

      currentLine.setAttributes({
        ...currentLine.getAttributes(),
        color: colorString,
        height: newHeight,
        coordinates: Point(
          createPointFrom(
            coordinates.x,
            viewport.getState().getSize().height - newHeight
          )
        ),
      });
    }
  }

  const self: LogicObject = {
    update,
  };

  return Object.freeze(self);
}
