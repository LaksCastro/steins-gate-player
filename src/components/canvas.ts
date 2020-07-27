import { StateManager } from "./stateManager";
import { ViewportObject } from "./viewport";

export type CanvasObject = {
  defineCanvas: () => void;
  getCtx: () => CanvasRenderingContext2D;
};

export default function Canvas(selector: string): CanvasObject {
  const stateManager: StateManager = this;

  const viewport = stateManager.getInstance<ViewportObject>("viewport");

  function getCanvasNode(): HTMLCanvasElement {
    return document.querySelector(selector);
  }

  function defineCanvas(): void {
    const node = getCanvasNode();

    const viewportSize = viewport.getState().getSize();

    node.width = viewportSize.width;
    node.height = viewportSize.height;
  }

  function getCtx(): CanvasRenderingContext2D {
    return getCanvasNode().getContext("2d");
  }

  const self: CanvasObject = {
    defineCanvas,
    getCtx,
  };

  return Object.freeze(self);
}
