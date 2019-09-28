export default {
    GAME: {
        VIEWHEIGHT: 1080,
        VIEWWIDTH: 1920,
        TITLE: 'Replace Me',
    },
    SCENES: {
        BOOT: 'game_boot',
        LOAD: 'game_load',
        GAME: 'game_game',
        UI: 'UI',
    },
    DEFAULT_TEXT_STYLE: {
        font: 'Roboto',
        fontSize: 20,
        fill: '#ffffff',
        smoothed: false,
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
            lives: 3,
            invulnerabilityPeriod: 4000,
        },
    },
    COLLISION: {
        default: 0x0001,
        bullets: 0x0002,
        player: 0x0003,
        enemies: 0x0004,
    },
};
