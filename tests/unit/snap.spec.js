import { findClosestSnap } from "@/store/snap";

describe("findSnapPoint", () => {
  it("finds closest snap", () => {
    const snapPoints = {
      x: [{ x: 3 }, { x: 10 }, { x: 16 }, { x: 17 }, { x: 34 }, { x: 34 }],
      y: [{ y: 3 }, { y: 10 }, { y: 16 }, { y: 17 }, { y: 34 }, { y: 34 }]
    };
    const point = {x: 10, y: 24};
    const closestSnap = findClosestSnap({snapPointsSorted: snapPoints, point});
    expect(closestSnap).toBe({x: 10, y: 17});
  });
  it("finds closest snap", () => {
    const snapPoints = {
      x: [{ x: 3 }, { x: 10 }, { x: 16 }, { x: 17 }, { x: 34 }, { x: 34 }],
      y: [{ y: 3 }, { y: 10 }, { y: 16 }, { y: 17 }, { y: 34 }, { y: 34 }]
    };
    const point = {x: 1, y: 24};
    const closestSnap = findClosestSnap({snapPointsSorted: snapPoints, point});
    expect(closestSnap).toBe({x: 3, y: 17});
  });
  it("finds closest snap", () => {
    const snapPoints = {
      x: [{ x: 3 }, { x: 10 }, { x: 16 }, { x: 17 }, { x: 34 }, { x: 34 }],
      y: [{ y: 3 }, { y: 10 }, { y: 16 }, { y: 17 }, { y: 34 }, { y: 34 }]
    };
    const point = {x: 10, y: 40};
    const closestSnap = findClosestSnap({snapPointsSorted: snapPoints, point});
    expect(closestSnap).toBe({x: 10, y: 34});
  });
});
