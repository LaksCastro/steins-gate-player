import { StateManager } from "./stateManager";
import { PlayerObject } from "./player";
import { isMobile } from "./utils";

export type WebAudioApi = {
  context: AudioContext;
  analyser: AnalyserNode;
  source: MediaElementAudioSourceNode;
  frequencyData: Uint8Array;
};

export type WebAudioContextObject = {
  start: () => void;
  defineListener: (listener: () => void) => void;
  getApi: () => WebAudioApi;
};

export default function WebAudioContext(): WebAudioContextObject {
  const stateManager: StateManager = this;

  const player = stateManager.getInstance<PlayerObject>("player");

  let context: AudioContext;
  let analyser: AnalyserNode;
  let source: MediaElementAudioSourceNode;
  let frequencyData: Uint8Array;

  let callback: () => void;

  function getAudioNode(): HTMLAudioElement {
    return player.getState().getPlayerNode();
  }

  function onCanPlay(): void {
    source = context.createMediaElementSource(getAudioNode());

    source.connect(analyser);

    analyser.connect(context.destination);

    frequencyData = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(frequencyData);

    callback();
  }

  function start(): void {
    context = new AudioContext();
    analyser = context.createAnalyser();
    analyser.fftSize = 64;

    if (isMobile()) {
      analyser.smoothingTimeConstant = 0.2;
    }

    onCanPlay();
  }

  function defineListener(listener: () => void): void {
    callback = listener;
  }

  function getApi(): WebAudioApi {
    return {
      source,
      analyser,
      context,
      frequencyData,
    };
  }

  const self: WebAudioContextObject = {
    start,
    defineListener,
    getApi,
  };

  return Object.freeze(self);
}
