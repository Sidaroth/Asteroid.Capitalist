import Vector from 'math/vector';
import createSine from 'src/math/movement/sine';

const alternatingStandardShooterSine = function alternatingStandardShooterSineFunc(startTime, enemyCount) {
    return [{
        config: {
            location: new Vector(2000, 0),
            enemyCount,
            enemySpacing: new Vector(150, 0),
            enemyConfig: {
                type: 'standard',
                health: 2,
            },
            movement: createSine,
        },
        spawnTime: startTime,
    },
    {
        config: {
            location: new Vector(2000, 0),
            enemyCount,
            enemySpacing: new Vector(150, 0),
            enemyConfig: {
                type: 'shooting',
                health: 1,
            },
            movement: createSine,
        },
        spawnTime: startTime + 450,
    }];
};

export default alternatingStandardShooterSine;
