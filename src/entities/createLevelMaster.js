import createEnemy from './createEnemy';
import createState from 'utils/createState';
import store from 'src/store';
import createBoss from './createBoss';
import gameConfig from 'configs/gameConfig';
import createShield from './powerups/createShield';
import createRateOfFireModifier from './powerups/createRateOfFireModifier';

const createLevelMaster = () => {
    const state = {};
    const enemyPool = [];
    let upcomingWaves = [];
    let upcomingPowerups = [];
    let enemies = [];
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
            const boss = state.spawnBoss(location, config);
            enemies.push(boss);
            store.game.addEntity(boss);
        } else {
            const loc = location.clone();
            for (let i = 0; i < size; i += 1) {
                const enemy = state.spawnEnemy(loc.add(spacing), config, movementFunction);
                enemies.push(enemy);
                store.game.addEntity(enemy);
            }
        }
    }

    function spawnPowerup(location, type) {
        if (type === gameConfig.CONSTS.POWERUPS.SHIELD) {
            createShield(location);
        } else if (type === gameConfig.CONSTS.POWERUPS.DOUBLE_ROF) {
            createRateOfFireModifier(location);
        }
    }

    function readSpawnConfig(config) {
        const { waves, powerups } = config;
        waves.forEach((wave) => {
            upcomingWaves.push(wave);
        });
        upcomingWaves.sort((a, b) => b.spawnTime - a.spawnTime);
        nextWave = upcomingWaves.pop();

        console.log(upcomingWaves);

        powerups.forEach((powerup) => {
            upcomingPowerups.push(powerup);
        });
        upcomingPowerups.sort((a, b) => b.spawnTime - a.spawnTime);
        nextPowerup = upcomingPowerups.pop();

        levelStartTime = performance.now();
    }

    function update(time) {
        const now = performance.now();
        if (nextWave && now > levelStartTime + nextWave.spawnTime) {
            spawnWave(
                nextWave.config.location,
                nextWave.config.enemySpacing,
                nextWave.config.enemyCount,
                nextWave.config.enemyConfig,
                nextWave.config.movement,
            );
            nextWave = upcomingWaves.pop();
        }

        if (nextPowerup && now > levelStartTime + nextPowerup.spawnTime) {
            spawnPowerup(nextPowerup.config.location, nextPowerup.config.type);
            nextPowerup = upcomingPowerups.pop();
        }
    }

    function reset(levelConfig) {
        upcomingWaves = [];
        upcomingPowerups = [];
        enemies.forEach(e => e.destroy());
        enemies = [];
    }

    const localState = {
        spawnEnemy,
        spawnWave,
        spawnBoss,
        readSpawnConfig,
        update,
        reset,
    };

    return createState('EnemyFactory', state, {
        localState,
    });
};

const factory = createLevelMaster();
export default factory;
