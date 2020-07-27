export type LogicObject = {
  update: () => void;
};

export default function Logic(): LogicObject {
  function update(): void {}

  const self: LogicObject = {
    update,
  };

  return Object.freeze(self);
}
