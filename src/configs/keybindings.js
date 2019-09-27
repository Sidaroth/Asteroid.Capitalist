const KEYS = {
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    ENTER: 13,
    ESCAPE: 27,
    COMMA: 188,
    DOT: 190,
    // Alphabetical
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    I: 73,
    K: 75,
    L: 76,
    X: 88,
    Z: 90,
};

export default {
    MOVEMENT: {
        UP: [KEYS.W, KEYS.UP_ARROW],
        DOWN: [KEYS.S, KEYS.DOWN_ARROW],
        LEFT: [KEYS.A, KEYS.LEFT_ARROW],
        RIGHT: [KEYS.D, KEYS.RIGHT_ARROW],
    },
    INVENTORY: [KEYS.I],
};
