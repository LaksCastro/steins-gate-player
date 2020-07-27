export type WebAudioContextObject = {
  method: () => void;
};

export default function WebAudioContext(): WebAudioContextObject {
  function privateMethod(): void {
    console.log("Hi");
  }

  function method(): void {
    privateMethod();
  }

  const self: WebAudioContextObject = {
    method,
  };

  return Object.freeze(self);
}
