import Vector from 'src/math/vector';
import gameConfig from './gameConfig';
import createSine from 'src/math/movement/sine';
import createCosine from 'src/math/movement/cosine';
import createSigmoid from 'src/math/movement/sigmoid';
import createReverseSigmoid from 'src/math/movement/reverseSigmoid';

export default {
    level1: {
        waves: [
            // {
            //     config: {
            //         location: new Vector(2000, gameConfig.GAME.VIEWHEIGHT / 2),
            //         enemyCount: 6,
            //         enemySpacing: new Vector(75, 0),
            //         enemyConfig: {
            //             type: 'standard',
            //         },
            //         movement: undefined, // straight.
            //     },
            //     spawnTime: 1500,
            // },
            // {
            //     config: {
            //         location: new Vector(2000, 0),
            //         enemyCount: 12,
            //         enemySpacing: new Vector(75, 0),
            //         enemyConfig: {
            //             type: 'standard',
            //         },
            //         movement: createSine,
            //     },
            //     spawnTime: 6000,
            // },
            {
                config: {
                    location: new Vector(2000, 75),
                    enemyCount: 6,
                    enemySpacing: new Vector(0, 130),
                    enemyConfig: {
                        type: 'shooting',
                    },
                    movement: undefined,
                },
                spawnTime: 3000,
            },
            {
                config: {
                    location: new Vector(1700, 0),
                    enemyCount: 12,
                    enemySpacing: new Vector(75, 0),
                    enemyConfig: {
                        type: 'boss',
                        health: 4,
                    },
                    movement: undefined,
                },
                spawnTime: 800,
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
                spawnTime: 18000,
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
                spawnTime: 50000,
            },
        ],
        powerups: [
            {
                config: {
                    location: new Vector(gameConfig.GAME.VIEWWIDTH / 2, 200),
                    type: gameConfig.CONSTS.POWERUPS.SHIELD,
                },
                spawnTime: 5000,
            },
            {
                config: {
                    location: new Vector(gameConfig.GAME.VIEWWIDTH / 2, 200),
                    type: gameConfig.CONSTS.POWERUPS.SHIELD,
                },
                spawnTime: 45000,
            },
            {
                config: {
                    location: new Vector(gameConfig.GAME.VIEWWIDTH / 2, 200),
                    type: gameConfig.CONSTS.POWERUPS.DOUBLE_ROF,
                },
                spawnTime: 17500,
            },
        ],
        levelLength: 75000, // in ms.
    },
};
