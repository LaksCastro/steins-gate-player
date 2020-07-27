export type PointStruct = {
  x: number;
  y: number;
};

export type Point = {
  getCoordinates: () => PointStruct;
  setCoordinates: (newCoordinates: PointStruct) => void;
};

export function createPointFrom(x: number, y: number): PointStruct {
  return {
    x,
    y,
  };
}

export default function Point(initialCoordinates: PointStruct): Point {
  let coordinates = initialCoordinates;

  function getCoordinates(): PointStruct {
    return coordinates;
  }

  function setCoordinates(newCoordinates: PointStruct): void {
    coordinates = newCoordinates;
  }

  const self: Point = {
    getCoordinates,
    setCoordinates,
  };

  return Object.freeze(self);
}
