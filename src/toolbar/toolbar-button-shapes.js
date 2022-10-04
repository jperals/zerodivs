import store from "@/store";

const circleEdge = "71%";

export default [
  [
    function(color) {
      const lineWidth = store.getters.lineThickness;
      return {
        name: "Line, to bottom right",
        type: "linear",
        direction: "to bottom right",
        stops: [
          {
            color: "transparent",
            position: `calc(50% - ${lineWidth} / 2)`
          },
          {
            color,
            position: `calc(50% - ${lineWidth} / 2)`
          },
          {
            color,
            position: `calc(50% + ${lineWidth} / 2)`
          },
          {
            color: "transparent",
            position: `calc(50% + ${lineWidth} / 2)`
          }
        ]
      };
    },
    function(color) {
      const lineWidth = store.getters.lineThickness;
      return {
        name: "Line, to bottom left",
        type: "linear",
        direction: "to bottom left",
        stops: [
          {
            color: "transparent",
            position: `calc(50% - ${lineWidth} / 2)`
          },
          {
            color,
            position: `calc(50% - ${lineWidth} / 2)`
          },
          {
            color,
            position: `calc(50% + ${lineWidth} / 2)`
          },
          {
            color: "transparent",
            position: `calc(50% + ${lineWidth} / 2)`
          }
        ]
      };
    }
  ],
  [
    function(color) {
      return {
        name: "Rectangle",
        type: "linear",
        direction: "to bottom",
        stops: [
          {
            color
          },
          {
            color
          }
        ]
      };
    }
  ],
  [
    function(color) {
      return {
        name: "Bottom right triangle",
        type: "linear",
        direction: "to bottom right",
        stops: [
          {
            color: "transparent",
            position: "50%"
          },
          {
            color,
            position: "50%"
          }
        ]
      };
    },
    function(color) {
      return {
        name: "Top left triangle",
        type: "linear",
        direction: "to top left",
        stops: [
          {
            color: "transparent",
            position: "50%"
          },
          {
            color,
            position: "50%"
          }
        ]
      };
    },
    function(color) {
      return {
        name: "Bottom left triangle",
        type: "linear",
        direction: "to bottom left",
        stops: [
          {
            color: "transparent",
            position: "50%"
          },
          {
            color,
            position: "50%"
          }
        ]
      };
    },
    function(color) {
      return {
        name: "Top right triangle",
        type: "linear",
        direction: "to top right",
        stops: [
          {
            color: "transparent",
            position: "50%"
          },
          {
            color,
            position: "50%"
          }
        ]
      };
    }
  ],
  [
    function(color) {
      return {
        name: "Circle",
        type: "radial",
        direction: "at center",
        stops: [
          {
            color,
            position: circleEdge
          },
          {
            color: "transparent",
            position: circleEdge
          }
        ],
        repeat: "no-repeat"
      };
    },
    function(color) {
      const lineWidth = store.getters.lineThickness;
      return {
        name: "Empty circle",
        type: "radial",
        direction: "at center",
        stops: [
          {
            color: "transparent",
            position: `calc(${circleEdge} - ${lineWidth})`
          },
          {
            color,
            position: `calc(${circleEdge} - ${lineWidth})`
          },
          {
            color,
            position: circleEdge
          },
          {
            color: "transparent",
            position: circleEdge
          }
        ],
        repeat: "no-repeat"
      };
    }
  ],
  [
    function(color) {
      return {
        name: "Bottom right circle section",
        type: "radial",
        direction: "at top left",
        stops: [
          {
            color,
            position: circleEdge
          },
          {
            color: "transparent",
            position: circleEdge
          }
        ],
        repeat: "no-repeat"
      };
    },
    function(color) {
      return {
        name: "Bottom left circle section",
        type: "radial",
        direction: "at top right",
        stops: [
          {
            color,
            position: circleEdge
          },
          {
            color: "transparent",
            position: circleEdge
          }
        ],
        repeat: "no-repeat"
      };
    },
    function(color) {
      return {
        name: "Top left circle section",
        type: "radial",
        direction: "at bottom right",
        stops: [
          {
            color,
            position: circleEdge
          },
          {
            color: "transparent",
            position: circleEdge
          }
        ],
        repeat: "no-repeat"
      };
    },
    function(color) {
      return {
        name: "Top right circle section",
        type: "radial",
        direction: "at bottom left",
        stops: [
          {
            color,
            position: circleEdge
          },
          {
            color: "transparent",
            position: circleEdge
          }
        ],
        repeat: "no-repeat"
      };
    }
  ],
  [
    function(color) {
      const lineWidth = store.getters.lineThickness;
      return {
        name: "Bottom right arc",
        type: "radial",
        direction: "at top left",
        stops: [
          {
            color: "transparent",
            position: `calc(${circleEdge} - ${lineWidth})`
          },
          {
            color,
            position: `calc(${circleEdge} - ${lineWidth})`
          },
          {
            color,
            position: circleEdge
          },
          {
            color: "transparent",
            position: circleEdge
          }
        ]
      };
    },
    function(color) {
      const lineWidth = store.getters.lineThickness;
      return {
        name: "Bottom left arc",
        type: "radial",
        direction: "at top right",
        stops: [
          {
            color: "transparent",
            position: `calc(${circleEdge} - ${lineWidth})`
          },
          {
            color,
            position: `calc(${circleEdge} - ${lineWidth})`
          },
          {
            color,
            position: circleEdge
          },
          {
            color: "transparent",
            position: circleEdge
          }
        ],
        repeat: "no-repeat"
      };
    },
    function(color) {
      const lineWidth = store.getters.lineThickness;
      return {
        name: "Top left arc",
        type: "radial",
        direction: "at bottom right",
        stops: [
          {
            color: "transparent",
            position: `calc(${circleEdge} - ${lineWidth})`
          },
          {
            color,
            position: `calc(${circleEdge} - ${lineWidth})`
          },
          {
            color,
            position: circleEdge
          },
          {
            color: "transparent",
            position: circleEdge
          }
        ],
        repeat: "no-repeat"
      };
    },
    function(color) {
      const lineWidth = store.getters.lineThickness;
      return {
        name: "Top right arc",
        type: "radial",
        direction: "at bottom left",
        stops: [
          {
            color: "transparent",
            position: `calc(${circleEdge} - ${lineWidth})`
          },
          {
            color,
            position: `calc(${circleEdge} - ${lineWidth})`
          },
          {
            color,
            position: circleEdge
          },
          {
            color: "transparent",
            position: circleEdge
          }
        ],
        repeat: "no-repeat"
      };
    }
  ],
  [
    function(color) {
      return {
        name: "4 Tiles #1",
        type: "conic",
        stops: [
          {
            color,
            position: "25%"
          },
          {
            color: "transparent",
            position: "25%"
          },
          {
            color: "transparent",
            position: "50%"
          },
          {
            color,
            position: "50%"
          },
          {
            color,
            position: "75%"
          },
          {
            color: "transparent",
            position: "75%"
          }
        ],
        repeat: "no-repeat"
      };
    },
    function(color) {
      return {
        name: "4 Tiles #2",
        type: "conic",
        stops: [
          {
            color: "transparent",
            position: "25%"
          },
          {
            color,
            position: "25%"
          },
          {
            color,
            position: "50%"
          },
          {
            color: "transparent",
            position: "50%"
          },
          {
            color: "transparent",
            position: "75%"
          },
          {
            color,
            position: "75%"
          }
        ],
        repeat: "no-repeat"
      };
    }
  ]
];
