import store from 'src/store';
import eventConfig from 'configs/eventConfig';
import gameConfig from 'configs/gameConfig';
import Matter from 'matter-js';

const isPowerup = (state) => {
    const duration = 10000;
    const lifeTime = 0;

    let entity;
    let active = false;

    function __constructor() {
        state.type = gameConfig.TYPES.POWERUP;
        state.setColliderShape(Matter.Bodies.circle(state.getX(), state.getY(), 25));
        state.setCollisionCategory(gameConfig.COLLISION.powerup);
        state.addCollidesWith(gameConfig.COLLISION.player);
        state.listenOn(state, eventConfig.COLLISION.START, (e) => {
            if (e.entity.type === gameConfig.TYPES.PLAYER) {
                state.entity = e.entity;
                state.activate();
            }
        });

        store.game.addEntity(state);
    }

    function setDuration(dur) {
        state.duration = dur;
    }

    function activate() {
        // Remove visual.
        const sprite = state.getSprite();
        if (sprite) sprite.destroy();
        store.game.removeEntity(state);
        state.setColliderShape(undefined);
        state.setCollidesWith([]);

        state.entity.addPowerup(state);
        active = true;
    }

    function deactivate() {
        active = false;
    }

    function update(time) {
        if (active) {
            state.lifeTime += time.delta;
            if (state.lifeTime > state.duration) state.deactivate();
        }

        return time;
    }

    function isActive() {
        return active;
    }

    return {
        // props
        entity,
        lifeTime,
        duration,
        // methods
        __constructor,
        setDuration,
        activate,
        deactivate,
        update,
        isActive,
    };
};

export default isPowerup;
