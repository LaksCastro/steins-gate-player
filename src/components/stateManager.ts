import State, { State as StateInstance } from "./state";

export type StateManager = {
  getInstance: <S>(key: string) => StateInstance<S>;
  createInstance: <S>(key: string, initialState: S) => void;
};

export default function StateManager(): StateManager {
  let StateManager: object = {};

  function getInstance<S>(key: string): StateInstance<S> {
    return StateManager[key] as StateInstance<S>;
  }

  function createInstance<S>(key: string, initialState: S): void {
    const instance = State<S>(initialState);

    (StateManager[key] as StateInstance<S>) = instance;
  }

  const self: StateManager = {
    getInstance,
    createInstance,
  };

  return Object.freeze(self);
}
