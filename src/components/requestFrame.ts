export type RequestFrame = {
  start: () => void;
  resume: () => void;
  pause: () => void;
};

export default function RequestFrame(callback: () => void): RequestFrame {
  let paused = false;

  function isPaused(): boolean {
    return paused;
  }

  function start(): void {
    if (isPaused()) {
      return;
    }

    function frame() {
      callback();
      start();
    }

    window.requestAnimationFrame(frame);
  }

  function resume(): void {
    paused = false;
    start();
  }

  function pause(): void {
    paused = true;
  }

  const self: RequestFrame = {
    start,
    resume,
    pause,
  };

  return Object.freeze(self);
}
