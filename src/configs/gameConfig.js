export default {
    GAME: {
        VIEWHEIGHT: 1080,
        VIEWWIDTH: 1920,
        TITLE: 'Asteroid Capitalist',
    },
    SCENES: {
        BOOT: 'game_boot',
        LOAD: 'game_load',
        GAME: 'game_game',
        UI: 'UI',
        BACKGROUND: 'game_background',
        WORLD: 'game_world',
        MAINMENU: 'main_menu',
    },
    DEFAULT_TEXT_STYLE: {
        font: '32px future',
        fill: '#ffffff',
    },
    TITLE_TEXT_STYLE: {
        font: '100px future',
        fill: '#ffffff',
    },
    STORY_TEXT_STYLE: {
        font: '32px future',
        fill: '#ffffff',
        align: 'center',
        wordWrap: {
            width: 1400,
        },
    },
    INSTRUCTIONS_TEXT_STYLE: {
        font: '32px future',
        fill: '#ffffff',
        align: 'center',
        wordWrap: {
            width: 1400,
        },
    },
    CREDITS_TEXT_STYLE: {
        font: '24px future',
        fill: '#ffffff',
        align: 'center',
        wordWrap: {
            width: 1400,
        },
    },
    UI_DEFAULT: {
        tint: 0xaaaaaa,
    },
    PLAYER: {
        HEALTHCONFIG: {
            health: 1,
            respawnTime: 1000,
            respawnPosition: {
                x: 100,
                y: 300,
            },
            lives: 8,
            invulnerabilityPeriod: 4000,
        },
    },
    COLLISION: {
        default: 0x0001,
        bullet: 0x0002,
        player: 0x0003,
        enemy: 0x0004,
        powerup: 0x0005,
        enemyBullet: 0x0006,
    },
    CONSTS: {
        DIRECTION: {
            UP: 0,
            DOWN: 1,
            LEFT: 2,
            RIGHT: 3,
        },
        POWERUPS: {
            SHIELD: 'shield',
            DOUBLE_ROF: 'double_ROF',
        },
    },
    TYPES: {
        PLAYER: 'player',
        POWERUP: 'powerup',
        ENEMY: 'enemy',
        BULLET: 'bullet',
        BACKGROUND: 'parallaxBackground',
        BOSS: 'boss',
    },
    // Mapping of a PS4 controller. (IDs should be similar for all standard mapped controllers, even if the naming is off.)
    GAMEPAD_MAPPING: {
        AXES: { // Horizontal and vertical axes for Left and Right thumbstick.
            L_HOR: 0,
            L_VER: 1,
            R_HOR: 2,
            R_VER: 3,
        },
        BUTTONS: {
            X: 0,
            CIRCLE: 1,
            SQUARE: 2,
            TRIANGLE: 3,
            L1: 4,
            R1: 5,
            L2: 6,
            R2: 7,
            SELECT: 8,
            START: 9,
            L3: 10,
            R3: 11,
            UP_ARROW: 12,
            DOWN_ARROW: 13,
            LEFT_ARROW: 14,
            RIGHT_ARROW: 15,
            HOME: 16,
            TOUCH_PAD: 17,
        },
        DEADZONE: 0.08,
        SENSITIVITY: 18,
    },
};
