export default [
  function (color) {
    return {
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
      ],
      repeat: "no-repeat"
    }
  },
  function (color) {
    return {
      type: "radial",
      direction: "at center",
      stops: [
        {
          color
        },
        {
          color,
          position: "71%"
        },
        {
          color: "transparent",
          position: "71%"
        }
      ],
      repeat: "no-repeat"
    }
  }
];
