import { findClosestSnap } from "@/store/snap";

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
