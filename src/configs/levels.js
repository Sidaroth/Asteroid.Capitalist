import Vector from 'src/math/vector';
import gameConfig from './gameConfig';
import createSine from 'src/math/movement/sine';
import createCosine from 'src/math/movement/cosine';
import createSigmoid from 'src/math/movement/sigmoid';
import createReverseSigmoid from 'src/math/movement/reverseSigmoid';
import getRandomInt from 'src/math/getRandomInt';
import vFormation from './waves/vFormation';
import tightFormation from './waves/tightFormation';
import alternatingStandardShooterSine from './waves/alternatingStandardShooterSine';

export default {
    level1: {
        waves: [
            {
                config: {
                    location: new Vector(1700, 0),
                    enemyCount: 12,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'boss',
                        health: 325, // should be fine, though a bit difficult. Probably needs some powerups.
                    },
                    movement: undefined, // Boss has it's own movement pattern predefined.
                },
                spawnTime: 245000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 12,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                        health: 2,
                    },
                    movement: createSine,
                },
                spawnTime: 1000,
            },
            {
                config: {
                    location: new Vector(2000, 75),
                    enemyCount: 10,
                    enemySpacing: new Vector(75, 75),
                    enemyConfig: {
                        type: 'standard',
                        health: 3,
                    },
                    movement: undefined,
                },
                spawnTime: 9000,
            },
            {
                config: {
                    location: new Vector(2000, 75),
                    enemyCount: 6,
                    enemySpacing: new Vector(0, 130),
                    enemyConfig: {
                        type: 'shooting',
                        health: 4,
                    },
                    movement: undefined,
                },
                spawnTime: 24000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 12,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                    },
                    movement: createCosine,
                },
                spawnTime: 15000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 12,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                    },
                    movement: createSigmoid,
                },
                spawnTime: 30000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 12,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                    },
                    movement: createReverseSigmoid,
                },
                spawnTime: 30000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 8,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                    },
                    movement: createSigmoid,
                },
                spawnTime: 40000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 8,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                    },
                    movement: createSigmoid,
                },
                spawnTime: 44000,
            },
            {
                config: {
                    location: new Vector(2000, 220),
                    enemyCount: 4,
                    enemySpacing: new Vector(0, 130),
                    enemyConfig: {
                        type: 'shooting',
                        health: 4,
                    },
                    movement: undefined,
                },
                spawnTime: 50000,
            },
            {
                config: {
                    location: new Vector(2000, 220),
                    enemyCount: 4,
                    enemySpacing: new Vector(0, 130),
                    enemyConfig: {
                        type: 'shooting',
                        health: 3,
                    },
                    movement: undefined,
                },
                spawnTime: 54000,
            },
            {
                config: {
                    location: new Vector(2000, 75),
                    enemyCount: 10,
                    enemySpacing: new Vector(75, 75),
                    enemyConfig: {
                        type: 'standard',
                        health: 2,
                    },
                    movement: undefined,
                },
                spawnTime: 60000,
            },
            {
                config: {
                    location: new Vector(2000, gameConfig.GAME.VIEWHEIGHT - 75),
                    enemyCount: 10,
                    enemySpacing: new Vector(75, -75),
                    enemyConfig: {
                        type: 'standard',
                        health: 2,
                    },
                    movement: undefined,
                },
                spawnTime: 65000,
            },
            {
                config: {
                    location: new Vector(2000, 75),
                    enemyCount: 6,
                    enemySpacing: new Vector(0, 130),
                    enemyConfig: {
                        type: 'shooting',
                        health: 2,
                    },
                    movement: undefined,
                },
                spawnTime: 75000,
            },
            {
                config: {
                    location: new Vector(2000, 75),
                    enemyCount: 6,
                    enemySpacing: new Vector(0, 130),
                    enemyConfig: {
                        type: 'shooting',
                        health: 2,
                    },
                    movement: undefined,
                },
                spawnTime: 77000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 12,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                        health: 2,
                    },
                    movement: createCosine,
                },
                spawnTime: 86000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 24,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                    },
                    movement: createSine,
                },
                spawnTime: 95000,
            },
            {
                config: {
                    location: new Vector(2000, 350),
                    enemyCount: 10,
                    enemySpacing: new Vector(100, getRandomInt(-25, 25)),
                    enemyConfig: {
                        type: 'standard',
                        health: 3,
                    },
                    movement: undefined,
                },
                spawnTime: 105000,
            },
            {
                config: {
                    location: new Vector(2000, gameConfig.GAME.VIEWHEIGHT - 350),
                    enemyCount: 10,
                    enemySpacing: new Vector(100, getRandomInt(-25, 25)),
                    enemyConfig: {
                        type: 'standard',
                        health: 3,
                    },
                    movement: undefined,
                },
                spawnTime: 105000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 15,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                    },
                    movement: createSigmoid,
                },
                spawnTime: 115000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 15,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                    },
                    movement: createReverseSigmoid,
                },
                spawnTime: 120000,
            },
            {
                config: {
                    location: new Vector(2000, gameConfig.GAME.VIEWHEIGHT / 2),
                    enemyCount: 1,
                    enemySpacing: new Vector(0, 0),
                    enemyConfig: {
                        type: 'shooting',
                        health: 2,
                    },
                    movement: undefined,
                },
                spawnTime: 130000,
            },
            {
                config: {
                    location: new Vector(2000, gameConfig.GAME.VIEWHEIGHT / 2 - 225),
                    enemyCount: 2,
                    enemySpacing: new Vector(0, 150),
                    enemyConfig: {
                        type: 'shooting',
                        health: 2,
                    },
                    movement: undefined,
                },
                spawnTime: 130500,
            },
            {
                config: {
                    location: new Vector(2000, gameConfig.GAME.VIEWHEIGHT / 2 - 375),
                    enemyCount: 2,
                    enemySpacing: new Vector(0, 250),
                    enemyConfig: {
                        type: 'shooting',
                        health: 2,
                    },
                    movement: undefined,
                },
                spawnTime: 131000,
            },
            {
                config: {
                    location: new Vector(2000, gameConfig.GAME.VIEWHEIGHT / 2 - 525),
                    enemyCount: 2,
                    enemySpacing: new Vector(0, 350),
                    enemyConfig: {
                        type: 'shooting',
                        health: 2,
                    },
                    movement: undefined,
                },
                spawnTime: 131500,
            },
            {
                config: {
                    location: new Vector(2000, gameConfig.GAME.VIEWHEIGHT / 2 - 675),
                    enemyCount: 2,
                    enemySpacing: new Vector(0, 450),
                    enemyConfig: {
                        type: 'shooting',
                        health: 2,
                    },
                    movement: undefined,
                },
                spawnTime: 132000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 15,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                        health: 2,
                    },
                    movement: createCosine,
                },
                spawnTime: 140000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 15,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                        health: 2,
                    },
                    movement: createSine,
                },
                spawnTime: 140000,
            },
            ...alternatingStandardShooterSine(150000, 12),
            {
                config: {
                    location: new Vector(2000, 240),
                    enemyCount: 6,
                    enemySpacing: new Vector(0, 80),
                    enemyConfig: {
                        type: 'standard',
                        health: 3,
                    },
                    movement: undefined,
                },
                spawnTime: 165000,
            },
            {
                config: {
                    location: new Vector(2000, 280),
                    enemyCount: 5,
                    enemySpacing: new Vector(0, 80),
                    enemyConfig: {
                        type: 'shooting',
                        health: 1,
                    },
                    movement: undefined,
                },
                spawnTime: 166000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 12,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                        health: 2,
                    },
                    movement: createReverseSigmoid,
                },
                spawnTime: 178000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 12,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'standard',
                        health: 2,
                    },
                    movement: createSigmoid,
                },
                spawnTime: 183000,
            },
            ...tightFormation(190000, 240),
            {
                config: {
                    location: new Vector(2000, 200),
                    enemyCount: 8,
                    enemySpacing: new Vector(0, 80),
                    enemyConfig: {
                        type: 'standard',
                        health: 2,
                    },
                    movement: undefined,
                },
                spawnTime: 199000,
            },
            {
                config: {
                    location: new Vector(2000, 200),
                    enemyCount: 5,
                    enemySpacing: new Vector(0, 125),
                    enemyConfig: {
                        type: 'shooting',
                        health: 3,
                    },
                    movement: undefined,
                },
                spawnTime: 199900,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 8,
                    enemySpacing: new Vector(125, 0),
                    enemyConfig: {
                        type: 'shooting',
                        health: 1,
                    },
                    movement: createSine,
                },
                spawnTime: 210500,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 8,
                    enemySpacing: new Vector(165, 0),
                    enemyConfig: {
                        type: 'shooting',
                        health: 1,
                    },
                    movement: createReverseSigmoid,
                },
                spawnTime: 217000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 8,
                    enemySpacing: new Vector(165, 0),
                    enemyConfig: {
                        type: 'standard',
                        health: 1,
                    },
                    movement: createSigmoid,
                },
                spawnTime: 222000,
            },
            ...vFormation(232000, 240),
            ...vFormation(233000, 620),
        ],
        powerups: [
            {
                config: {
                    location: new Vector(gameConfig.GAME.VIEWWIDTH / 2, 200),
                    type: gameConfig.CONSTS.POWERUPS.SHIELD,
                },
                spawnTime: 20000,
            },
            {
                config: {
                    location: new Vector(gameConfig.GAME.VIEWWIDTH / 2 - 200, 200),
                    type: gameConfig.CONSTS.POWERUPS.SHIELD,
                },
                spawnTime: 72500,
            },
            {
                config: {
                    location: new Vector(gameConfig.GAME.VIEWWIDTH / 2 - 400, 200),
                    type: gameConfig.CONSTS.POWERUPS.DOUBLE_ROF,
                },
                spawnTime: 65000,
            },
            {
                config: {
                    location: new Vector(gameConfig.GAME.VIEWWIDTH / 2, 800),
                    type: gameConfig.CONSTS.POWERUPS.DOUBLE_ROF,
                },
                spawnTime: 110000,
            },
            {
                config: {
                    location: new Vector(gameConfig.GAME.VIEWWIDTH / 2 - 200, 800),
                    type: gameConfig.CONSTS.POWERUPS.SHIELD,
                },
                spawnTime: 150000,
            },
            {
                config: {
                    location: new Vector(gameConfig.GAME.VIEWWIDTH / 2 + 300, 800),
                    type: gameConfig.CONSTS.POWERUPS.DOUBLE_ROF,
                },
                spawnTime: 185000,
            },
        ],
        levelLength: 360000, // estimated, in ms.
    },
};
