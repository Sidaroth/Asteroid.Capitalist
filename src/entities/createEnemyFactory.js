import createEnemy from './createEnemy';
import createState from 'utils/createState';
import createSineFunc from 'src/math/movement/sine';
import store from 'src/store';

const createEnemyFactory = () => {
    const state = {};
    const enemyPool = [];

    function spawnEnemy(location, type, config) {
        const availableEnemy = enemyPool.find(e => e.type === type && e.available);
        if (availableEnemy) return availableEnemy;

        const newEnemy = createEnemy(location);
        newEnemy.setMovementFunction(createSineFunc);
        return newEnemy;
    }

    function spawnWave(location, spacing, size, type, config) {
        for (let i = 0; i < size; i += 1) {
            store.game.addEntity(state.spawnEnemy(location.add(spacing), type, config));
        }
    }

    const localState = {
        spawnEnemy,
        spawnWave,
    };

    return createState('EnemyFactory', state, {
        localState,
    });
};

const factory = createEnemyFactory();
export default factory;
