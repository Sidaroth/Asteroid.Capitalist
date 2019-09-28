import createEnemy from './createEnemy';
import createState from 'utils/createState';
import store from 'src/store';

const createEnemyFactory = () => {
    const state = {};
    const enemyPool = [];

    function spawnEnemy(location, type, config, movementFunc) {
        const availableEnemy = enemyPool.find(e => e.type === type && e.available);
        if (availableEnemy) return availableEnemy;

        const newEnemy = createEnemy(location, movementFunc);
        return newEnemy;
    }

    function spawnWave(location, spacing, size, type, config, movementFunction) {
        for (let i = 0; i < size; i += 1) {
            store.game.addEntity(state.spawnEnemy(location.add(spacing), type, config, movementFunction));
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
