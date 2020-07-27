export type ViewportSize = {
  width: number;
  height: number;
};

export type ViewportObject = {
  getSize: () => ViewportSize;
};

export default function Viewport(selector: string): ViewportObject {
  const getSize =
    selector === "window" ? getWindowSize : getCustomViewportObjectSize;

  function getNode(): HTMLElement {
    return document.querySelector(selector);
  }

  function getWindowSize(): ViewportSize {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  }

  function getCustomViewportObjectSize(): ViewportSize {
    const node = getNode();

    const { width, height } = node.getBoundingClientRect();

    return {
      width,
      height,
    };
  }

  const self: ViewportObject = {
    getSize,
  };

  return Object.freeze(self);
}
