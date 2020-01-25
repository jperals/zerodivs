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
        position: "15%"
      },
      {
        color,
        position: "15%"
      },
      {
        color,
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
  }