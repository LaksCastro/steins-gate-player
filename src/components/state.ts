export type State<S> = {
  setState: (getNewState: S | ((currentState: S) => S)) => void;
  getState: () => S;
};

export default function State<S>(initialState: S): State<S> {
  let state: S = initialState;

  function setState(getNewState: S | ((currentState: S) => S)): void {
    const newState =
      typeof getNewState === "function"
        ? (getNewState as (currentState: S) => S)(getState())
        : getNewState;

    state = newState;
  }

  function getState(): S {
    return state;
  }

  const self: State<S> = {
    setState,
    getState,
  };

  return Object.freeze(self);
}
