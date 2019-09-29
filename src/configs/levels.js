import Vector from 'src/math/vector';
import gameConfig from './gameConfig';
import createSine from 'src/math/movement/sine';
import createCosine from 'src/math/movement/cosine';
import createSigmoid from 'src/math/movement/sigmoid';
import createReverseSigmoid from 'src/math/movement/reverseSigmoid';

export default {
    level1: {
        waves: [
            {
                config: {
                    location: new Vector(2000, gameConfig.GAME.VIEWHEIGHT / 2),
                    enemyCount: 6,
                    enemySpacing: 75,
                    enemyConfig: {
                        type: 'standard',
                    },
                    movement: undefined, // straight.
                },
                spawnTime: 1500,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 12,
                    enemySpacing: 75,
                    enemyConfig: {
                        type: 'standard',
                    },
                    movement: createSine,
                },
                spawnTime: 6000,
            },
            {
                config: {
                    location: new Vector(2000, 0),
                    enemyCount: 12,
                    enemySpacing: 75,
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
                    enemySpacing: 75,
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
                    enemySpacing: 75,
                    enemyConfig: {
                        type: 'standard',
                    },
                    movement: createReverseSigmoid,
                },
                spawnTime: 50000,
            },
        ],
        powerups: [],
        levelLength: 75000, // in ms.
    },
};
