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
            lives: 1,
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
};
