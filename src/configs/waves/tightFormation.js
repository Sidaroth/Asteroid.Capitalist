import Vector from 'math/vector';

const tightFormation = function tightFormationFunc(startTime, x) {
    return [{
        config: {
            location: new Vector(2000, x), // 240
            enemyCount: 2,
            enemySpacing: new Vector(0, 80),
            enemyConfig: {
                type: 'standard',
                health: 4,
            },
            movement: undefined,
        },
        spawnTime: startTime,
    },
    {
        config: {
            location: new Vector(2000, x + 40), // 280
            enemyCount: 1,
            enemySpacing: new Vector(0, 80),
            enemyConfig: {
                type: 'shooting',
                health: 2,
                rateOfFire: 20,
            },
            movement: undefined,
        },
        spawnTime: startTime + 400,
    },
    {
        config: {
            location: new Vector(2000, x - 120), // 120
            enemyCount: 2,
            enemySpacing: new Vector(0, 160),
            enemyConfig: {
                type: 'standard',
                health: 4,
            },
            movement: undefined,
        },
        spawnTime: startTime + 400,
    },
    {
        config: {
            location: new Vector(2000, x), // 240
            enemyCount: 2,
            enemySpacing: new Vector(0, 80),
            enemyConfig: {
                type: 'standard',
                health: 4,
            },
            movement: undefined,
        },
        spawnTime: startTime + 800,
    }];
};

export default tightFormation;
