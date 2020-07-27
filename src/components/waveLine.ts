import { Point } from "./point";
import { ViewportSize } from "./viewport";

export type WaveLineStruct = ViewportSize & {
  color: string;
  coordinates: Point;
};

export type WaveLineObject = {
  getAttributes: () => WaveLineStruct;
  setAttributes: (newAttributes: WaveLineStruct) => void;
};

export default function WaveLine(
  initialAttributes: WaveLineStruct
): WaveLineObject {
  let attributes = initialAttributes;

  function getAttributes(): WaveLineStruct {
    return attributes;
  }

  function setAttributes(newAttributes: WaveLineStruct): void {
    attributes = newAttributes;
  }

  const self: WaveLineObject = {
    getAttributes,
    setAttributes,
  };

  return Object.freeze(self);
}
