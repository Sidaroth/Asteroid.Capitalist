export default {
    SPEAKER: {
        KEY: 'speaker',
        PATH: 'assets/images/speaker.png',
    },
    SPEAKER_OFF: {
        KEY: 'speaker_off',
        PATH: 'assets/images/speaker-off.png',
    },
    PLAYER_SHIP_ICON: {
        KEY: 'player_ship_icon',
        PATH: 'assets/images/PNG/UI/playerLife2_green.png',
    },
    BACKGROUND_TILE: {
        KEY: 'background_tile',
        PATH: 'assets/images/Backgrounds/blue.png',
    },
    POWERUP_DOUBLEROF: {
        KEY: 'powerup_doublerof',
        PATH: 'assets/images/PNG/Power-ups/things_gold.png',
    },
    POWERUP_SHIELD_ICON: {
        KEY: 'powerup_shield_icon',
        PATH: 'assets/images/PNG/Power-ups/shield_silver.png',
    },
    SHIELD: {
        KEY: 'shield',
        PATH: 'assets/images/PNG/Effects/shield.png',
    },
    LASER: {
        KEY: 'laser',
        PATH: 'assets/images/PNG/Lasers/laserGreen05.png',
    },
    // Atlases/spritesheets.
    SHIPPACK: {
        KEY: 'ship',
        JSON: 'assets/images/ships.json',
        ATLAS: 'assets/images',
    },
    METEORPACK: {
        KEY: 'meteor',
        JSON: 'assets/images/meteors.json',
        ATLAS: 'assets/images',
        SPRITEKEYS: [
            'meteorBrown_big1.png',
            'meteorBrown_big2.png',
            'meteorBrown_big3.png',
            'meteorBrown_big4.png',
            'meteorGrey_big1.png',
            'meteorGrey_big2.png',
            'meteorGrey_big3.png',
            'meteorGrey_big4.png',
        ],
    },
    EXPLOSIONPACK: {
        KEY: 'explosion_pack',
        JSON: 'assets/images/explosion.json',
        ATLAS: 'assets/images',
        ANIMATIONS: [
            {
                key: 'explosion',
                prefix: 'explosion',
                start: 0,
                end: 3,
                suffix: '.png',
                frameRate: 16,
                repeat: 0,
            },
        ],
    },
};
