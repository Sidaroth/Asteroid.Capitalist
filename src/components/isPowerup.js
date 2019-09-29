import store from 'src/store';
import eventConfig from 'configs/eventConfig';
import gameConfig from 'configs/gameConfig';
import Matter from 'matter-js';

const isPowerup = (state) => {
    let duration = 10000;
    let entity;
    let startTime;
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
        duration = dur;
    }

    function activate() {
        // Remove visual.
        const sprite = state.getSprite();
        if (sprite) sprite.destroy();
        store.game.removeEntity(state);

        startTime = performance.now();
        state.entity.addPowerup(state);
        active = true;
    }

    function deactivate() {
        active = false;
    }

    function update() {
        if (performance.now() > startTime + duration) state.deactivate();
    }

    function isActive() {
        return active;
    }

    return {
        // props
        entity,
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
