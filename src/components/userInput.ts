export type UserInput = {
  onStart: (callback: () => void) => void;
};

export default function UserInput(): UserInput {
  const wrapperClassName = ".user-input-wrapper";

  const buttonClassName = ".user-input-wrapper__main-button";

  const wrapperVisibleClassName = "var--visible";
  const wrapperHiddenClassName = "var--hidden";

  let callback: () => void;

  function getWrapperNode(): HTMLDivElement {
    return document.querySelector(wrapperClassName);
  }

  function getButtonNode(): HTMLButtonElement {
    return document.querySelector(buttonClassName);
  }

  function defineListener(): void {
    const node = getButtonNode();

    node.onclick = onButtonClick;
  }

  function onButtonClick(): void {
    const wrapper = getWrapperNode();

    wrapper.classList.add(wrapperHiddenClassName);
    wrapper.classList.remove(wrapperVisibleClassName);

    callback();
  }

  function onStart(listener: () => void): void {
    defineListener();

    callback = listener;
  }

  const self: UserInput = {
    onStart,
  };

  return Object.freeze(self);
}
