export default [
  function(color) {
    return {
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
  },
  function(color) {
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
    };
  },
  function(color) {
    return {
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
      ],
      repeat: "no-repeat"
    };
  },
  function(color) {
    return {
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
      ],
      repeat: "no-repeat"
    };
  },
  function(color) {
    return {
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
      ],
      repeat: "no-repeat"
    };
  },
  function(color) {
    return {
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
  },
  function(color) {
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
    };
  },
  function(color) {
    return {
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
  },
  function(color) {
    return {
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
      ],
      repeat: "no-repeat"
    };
  },
  function(color) {
    return {
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
];
