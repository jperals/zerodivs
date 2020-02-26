import { findClosestSnap, generateSnapPoints } from "@/snap/snap";

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
      {
        left: { value: 50 },
        top: { value: 43 },
        width: { value: 34 },
        height: { value: 10 }
      },
      {
        left: { value: 10 },
        top: { value: -10 },
        width: { value: 100 },
        height: { value: 30 }
      }
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
