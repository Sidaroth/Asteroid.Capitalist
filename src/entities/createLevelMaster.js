import createEnemy from './createEnemy';
import createState from 'utils/createState';
import store from 'src/store';
import createBoss from './createBoss';

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

        const newEnemy = createEnemy(location, config, movementFunc);
        return newEnemy;
    }

    function spawnBoss(location, config) {
        const boss = createBoss(location, config);

        return boss;
    }

    function spawnWave(location, spacing, size, config, movementFunction) {
        if (config.type === 'boss') {
            store.game.addEntity(state.spawnBoss(location, config));
        } else {
            for (let i = 0; i < size; i += 1) {
                store.game.addEntity(state.spawnEnemy(location.add(spacing), config, movementFunction));
            }
        }
    }

    // TODO: MUST-FIX powerup spawning.
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
        spawnBoss,
        readSpawnConfig,
        update,
    };

    return createState('EnemyFactory', state, {
        localState,
    });
};

const factory = createLevelMaster();
export default factory;
