import shapes2css from "@/common/shapes2css";

describe("shapes2css", () => {
  it("Converts shapes to CSS", () => {
    const shapes = [
      {
        width: {
          value: 200,
          units: "px"
        },
        height: {
          value: 300,
          units: "px"
        },
        top: {
          value: 300,
          units: "px"
        },
        left: {
          value: 300,
          units: "px"
        },
        type: "linear",
        direction: "230deg",
        stops: [
          {
            color: "transparent"
          },
          {
            color: "transparent",
            position: "15%"
          },
          {
            color: "#e66465",
            position: "15%"
          },
          {
            color: "#e66465",
            position: "65%"
          },
          {
            color: "transparent",
            position: "65%"
          },
          {
            color: "transparent"
          }
        ]
      },
      {
        width: {
          value: 300,
          units: "px"
        },
        height: {
          value: 300,
          units: "px"
        },
        top: {
          value: 300,
          units: "px"
        },
        left: {
          value: 700,
          units: "px"
        },
        type: "radial",
        direction: "circle at bottom",
        stops: [
          {
            color: "transparent"
          },
          { color: "transparent", position: "15%" },
          {
            color: "#e66465",
            position: "15%"
          },
          {
            color: "#9198e5",
            position: "45%"
          },
          {
            color: "transparent",
            position: "45%"
          },
          {
            color: "transparent"
          }
        ]
      }
    ];
    const expectedCss = `\
background-image: radial-gradient(circle at bottom, transparent, transparent 15%, #e66465 15%, #9198e5 45%, transparent 45%, transparent), linear-gradient(230deg, transparent, transparent 15%, #e66465 15%, #e66465 65%, transparent 65%, transparent);
background-position: 700px 300px, 300px 300px;
background-size: 300px 300px, 200px 300px;
background-repeat: no-repeat;
`;
    const computedCss = shapes2css(shapes);
    expect(computedCss).toEqual(expectedCss);
  });
});
