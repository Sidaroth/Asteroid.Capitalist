import createEnemy from './createEnemy';
import createState from 'utils/createState';
import store from 'src/store';

const createLevelMaster = () => {
    const state = {};
    const enemyPool = [];
    const upcomingWaves = [];
    const upcomingPowerups = [];
    let levelStartTime;
    let nextWave;
    let nextPowerup;

    function spawnEnemy(location, config, movementFunc) {
        const availableEnemy = enemyPool.find(e => e.type === config.type && e.available);
        if (availableEnemy) return availableEnemy;

        const newEnemy = createEnemy(location, movementFunc);
        return newEnemy;
    }

    function spawnWave(location, spacing, size, config, movementFunction) {
        for (let i = 0; i < size; i += 1) {
            store.game.addEntity(state.spawnEnemy(location.add(spacing), config, movementFunction));
        }
    }

    function readSpawnConfig(config) {
        const { waves, powerups } = config;
        waves.forEach((wave) => {
            upcomingWaves.push(wave);
        });
        upcomingWaves.sort((a, b) => b.spawnTime - a.spawnTime);
        nextWave = upcomingWaves.pop();

        powerups.forEach((powerup) => {
            upcomingPowerups.push(powerup);
        });
        upcomingPowerups.sort((a, b) => b.spawnTime - a.spawnTime);
        nextPowerup = upcomingPowerups.pop();

        levelStartTime = performance.now();

        // console.log(nextWave);
    }

    function update(time) {
        if (nextWave && performance.now() > levelStartTime + nextWave.spawnTime) {
            spawnWave(
                nextWave.config.location,
                nextWave.config.enemySpacing,
                nextWave.config.enemyCount,
                nextWave.config.enemyConfig,
                nextWave.config.movement,
            );
            nextWave = upcomingWaves.pop();
        }
    }

    const localState = {
        spawnEnemy,
        spawnWave,
        readSpawnConfig,
        update,
    };

    return createState('EnemyFactory', state, {
        localState,
    });
};

const factory = createLevelMaster();
export default factory;
