export type PlayerObject = {
  getPlayerNode: () => HTMLAudioElement;
  play: () => void;
  pause: () => void;
};

export default function Player(selector: string): PlayerObject {
  function getPlayerNode(): HTMLAudioElement {
    return document.querySelector(selector);
  }

  function play(): void {
    const node = getPlayerNode();

    node.play();
  }

  function pause(): void {
    const node = getPlayerNode();

    node.pause();
  }

  function connect(): void {}

  const self: PlayerObject = {
    getPlayerNode,
    play,
    pause,
  };

  return Object.freeze(self);
}
