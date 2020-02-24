import { findClosestSnap, generateSnapPoints } from "@/store/snap";

describe("findSnapPoint", () => {
  it("finds closest snap", () => {
    const snapPoints = {
      x: [
        { value: 3 },
        { value: 10 },
        { value: 16 },
        { value: 17 },
        { value: 34 },
        { value: 34 }
      ],
      y: [
        { value: 3 },
        { value: 10 },
        { value: 16 },
        { value: 17 },
        { value: 34 },
        { value: 34 }
      ]
    };
    const point = { x: 10, y: 24 };
    const closestSnap = findClosestSnap({
      snapPointsSorted: snapPoints,
      point
    });
    expect(closestSnap).toEqual({ x: { value: 10 }, y: { value: 17 } });
  });
  it("finds closest snap", () => {
    const snapPoints = {
      x: [
        { value: 3 },
        { value: 10 },
        { value: 16 },
        { value: 17 },
        { value: 34 },
        { value: 34 }
      ],
      y: [
        { value: 3 },
        { value: 10 },
        { value: 16 },
        { value: 17 },
        { value: 34 },
        { value: 34 }
      ]
    };
    const point = { x: 1, y: 24 };
    const closestSnap = findClosestSnap({
      snapPointsSorted: snapPoints,
      point
    });
    expect(closestSnap).toEqual({ x: { value: 3 }, y: { value: 17 } });
  });
  it("finds closest snap", () => {
    const snapPoints = {
      x: [
        { value: 3 },
        { value: 10 },
        { value: 16 },
        { value: 17 },
        { value: 34 },
        { value: 34 }
      ],
      y: [
        { value: 3 },
        { value: 10 },
        { value: 16 },
        { value: 17 },
        { value: 34 },
        { value: 34 }
      ]
    };
    const point = { x: 10, y: 40 };
    const closestSnap = findClosestSnap({
      snapPointsSorted: snapPoints,
      point
    });
    expect(closestSnap).toEqual({ x: { value: 10 }, y: { value: 34 } });
  });
});

describe("generateSnapPoints", () => {
  it("generates snap points from shapes", () => {
    const shapes = [
      { left: 50, top: 43, width: 34, height: 10 },
      { left: 10, top: -10, width: 100, height: 30 }
    ];
    const snapPoints = generateSnapPoints(shapes);
    const snapPointValues = {
      x: snapPoints.x.map(point => point.value),
      y: snapPoints.y.map(point => point.value)
    };
    expect(snapPointValues).toEqual({
      x: [10, 50, 84, 110],
      y: [-10, 20, 43, 53]
    });
  });
});
