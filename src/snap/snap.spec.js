import { findClosestSnap, findClosestSnapInAxis, generateSnapPoints, moveByAndSnap } from "@/snap/snap";

describe("findClosestSnap", () => {
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

describe("findClosestSnapInAxis", () => {
  it("Finds closest snap in y axis", () => {
    const snapPointsSorted = [
      { value: 10 },
      { value: 20 },
      { value: 70 },
      { value: 90 },
      { value: 180 }
    ];
    const point = 23;
    const snap = findClosestSnapInAxis({
      point,
      snapPointsSorted
    });
    expect(snap).toEqual({
      value: 20
    });
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

describe("moveAndSnap", () => {
  const snapPoints = {
    x: [
      { value: 10 },
      { value: 20 },
      { value: 50 },
      { value: 70 },
      { value: 180 }
    ],
    y: [
      { value: 10 },
      { value: 20 },
      { value: 70 },
      { value: 90 },
      { value: 180 }
    ]
  };
  let shape;
  const delta = {
    left: { value: 15 },
    top: { value: -17 }
  };
beforeEach(() => {
  shape = {
    left: {
      value: 25
    },
    top: {
      value: 40
    },
    width: {
      value: 50
    },
    height: {
      value: 30
    }
  };
});
it("keeps a shape at the same position when no threshold is met", () => {
    const newProps = moveByAndSnap({
      shape, snapPoints, threshold: 2, ...delta
    });
    expect(newProps).toEqual(shape);
  });
it("moves a shape vertically when the threshold is met vertically", () => {
    const newProps = moveByAndSnap({
      shape, snapPoints, threshold: 5, ...delta
    });
    expect(newProps.left.value).toEqual(shape.left.value);
    expect(newProps.top.value).toEqual(20);
  });
it("moves a shape horizontally and vertically when the threshold is met in both axes", () => {
    const newProps = moveByAndSnap({
      shape, snapPoints, threshold: 10, ...delta
    });
    expect(newProps.left.value).toEqual(50);
    expect(newProps.top.value).toEqual(20);
  });
});
