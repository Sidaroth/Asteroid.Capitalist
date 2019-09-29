import eventConfig from 'configs/eventConfig';
import gameConfig from 'configs/gameConfig';

const hasHealth = function hasHealthFunc(state, config = {}) {
    const maxHealth = config.health || 1;
    let health = config.health || 1;
    let lives = config.lives || 1;
    let respawnPosition = config.respawnPosition || { x: 0, y: 0 };
    let respawnTimeout;
    let respawnTime = config.respawnTime || 0;
    let showHealthBar = config.showHealthBar || false;
    let invulnerabilityPeriod = config.invulnerabilityPeriod || 0;
    let timeOfDeath = -Infinity;
    let isImmune = false;

    function __constructor() {
        state.listenOn(state, eventConfig.COLLISION.START, (e) => {
            if (isImmune || state.isInvulnerable()) return;
            if (e.entity.type !== gameConfig.TYPES.POWERUP) {
                state.takeDamage(1);
            }
        });
    }

    function setImmune(status) {
        isImmune = status;
    }

    function isInvulnerable() {
        return performance.now() - timeOfDeath < invulnerabilityPeriod;
    }

    function setHealth(h) {
        health = h;
    }

    function getHealth() {
        return health;
    }

    function setLives(l) {
        lives = l;
    }

    function getLives() {
        return lives;
    }

    function setRespawnPosition(pos) {
        respawnPosition = pos;
    }

    function setRespawnTime(t) {
        respawnTime = t;
    }

    function setShowHealthBar(show) {
        showHealthBar = show;
    }

    function setInvulnerabilityPeriod(p) {
        invulnerabilityPeriod = p;
    }

    function respawn(time, position) {
        state.waitingForRespawn = true;
        respawnTimeout = setTimeout(() => {
            state.setPosition(position);
            state.waitingForRespawn = false;
            state.emit(eventConfig.ENTITY.RESPAWN);
        }, time);
    }

    function takeDamage(damage) {
        if (!state.isInvulnerable()) {
            health -= 1;
            state.emit(eventConfig.ENTITY.TAKEDAMAGE, {
                health,
                damage,
            });
            if (health <= 0) {
                state.die();
            }
        }
    }

    function die() {
        lives -= 1;
        health = maxHealth;
        timeOfDeath = performance.now();

        if (lives > 0) {
            respawn(respawnTime, respawnPosition);
        }

        state.emit(eventConfig.ENTITY.DIE, {
            lives,
            health,
        });
    }

    function destroy() {
        if (respawnTimeout) {
            clearTimeout(respawnTimeout);
        }
    }

    return {
        // props
        waitingForRespawn: false,
        // methods
        __constructor,
        isInvulnerable,
        setHealth,
        getHealth,
        setLives,
        getLives,
        setRespawnPosition,
        setRespawnTime,
        setShowHealthBar,
        setImmune,
        setInvulnerabilityPeriod,
        respawn,
        takeDamage,
        die,
        destroy,
    };
};

export default hasHealth;
