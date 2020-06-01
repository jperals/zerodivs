export default [
  [
    function(color) {
      return {
        name: "Rectangle",
        type: "linear",
        direction: "to bottom",
        stops: [
          {
            color,
            position: "0%"
          },
          {
            color,
            position: "100%"
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
      };
    },
    function(color) {
      return {
        name: "Top left triangle",
        type: "linear",
        direction: "to top left",
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
      };
    },
    function(color) {
      return {
        name: "Bottom left triangle",
        type: "linear",
        direction: "to bottom left",
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
      };
    },
    function(color) {
      return {
        name: "Top right triangle",
        type: "linear",
        direction: "to top right",
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
      };
    }
  ],
  [
    function(color) {
      return {
        name: "Cropped stripe, bottom left to top right",
        type: "linear",
        direction: "to top right",
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
            position: "85%"
          },
          {
            color: "transparent",
            position: "85%"
          }
        ]
      };
    },
    function(color) {
      return {
        name: "Cropped stripe, bottom right to top left",
        type: "linear",
        direction: "to top left",
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
            position: "85%"
          },
          {
            color: "transparent",
            position: "85%"
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
      };
    },
    function(color) {
      return {
        name: "Bottom left circle section",
        type: "radial",
        direction: "at top right",
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
      };
    },
    function(color) {
      return {
        name: "Top left circle section",
        type: "radial",
        direction: "at bottom right",
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
      };
    },
    function(color) {
      return {
        name: "Top right circle section",
        type: "radial",
        direction: "at bottom left",
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
      };
    }
  ],
  [
    function(color) {
      return {
        name: "Bottom right arc",
        type: "radial",
        direction: "at top left",
        stops: [
          {
            color: "transparent",
            position: "29%"
          },
          {
            color,
            position: "29%"
          },
          {
            color,
            position: "71%"
          },
          {
            color: "transparent",
            position: "71%"
          }
        ]
      };
    },
    function(color) {
      return {
        name: "Bottom left arc",
        type: "radial",
        direction: "at top right",
        stops: [
          {
            color: "transparent",
            position: "29%"
          },
          {
            color,
            position: "29%"
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
      };
    },
    function(color) {
      return {
        name: "Top left arc",
        type: "radial",
        direction: "at bottom right",
        stops: [
          {
            color: "transparent",
            position: "29%"
          },
          {
            color,
            position: "29%"
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
      };
    },
    function(color) {
      return {
        name: "Top right arc",
        type: "radial",
        direction: "at bottom left",
        stops: [
          {
            color: "transparent",
            position: "29%"
          },
          {
            color,
            position: "29%"
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
            color
          },
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
          },
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
            color: "transparent"
          },
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
          },
        ],
        repeat: "no-repeat"
      };
    }
  ]
];
