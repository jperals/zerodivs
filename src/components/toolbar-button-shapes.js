export default function toolbarButtonShapes(color) {
  return [
    {
      type: "linear",
      direction: "to bottom right",
      stops: [
        {
          color: "transparent"
        },
        {
          color: "transparent",
          position: "50%"
        },
        {
          color,
          position: "50%"
        }
      ]
    },
    {
      type: "radial",
      direction: "from center",
      stops: [
        {
          color
        },
        {
          color,
          position: "42.3%"
        },
        {
          color: "transparent",
          position: "42.3%"
        }
      ]
    }
  ];
}
