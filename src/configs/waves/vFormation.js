import Vector from 'math/vector';

const vFormation = function vFormationFunc(startTime, x) {
    return [{
        config: {
            location: new Vector(2000, x), // 220
            enemyCount: 1,
            enemySpacing: new Vector(0, 80),
            enemyConfig: {
                type: 'shooting',
                health: 1,
            },
            movement: undefined,
        },
        spawnTime: startTime,
    },
    {
        config: {
            location: new Vector(2000, x - 40), // 180
            enemyCount: 2,
            enemySpacing: new Vector(0, 80),
            enemyConfig: {
                type: 'shooting',
                health: 1,
            },
            movement: undefined,
        },
        spawnTime: startTime + 400,
    },
    {
        config: {
            location: new Vector(2000, x - 160), // 60
            enemyCount: 2,
            enemySpacing: new Vector(0, 160),
            enemyConfig: {
                type: 'shooting',
                health: 1,
            },
            movement: undefined,
        },
        spawnTime: startTime + 800,
    },
    {
        config: {
            location: new Vector(2000, x - 280), // -60
            enemyCount: 2,
            enemySpacing: new Vector(0, 240),
            enemyConfig: {
                type: 'shooting',
                health: 1,
            },
            movement: undefined,
        },
        spawnTime: startTime + 1200,
    }];
};

export default vFormation;
