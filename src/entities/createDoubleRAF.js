import createState from 'utils/createState';
import hasPosition from 'components/hasPosition';
import hasSprite from 'components/entities/hasSprite';
import hasCollision from 'components/entities/hasCollision';
import Matter from 'matter-js';
import gameConfig from 'configs/gameConfig';
import store from 'src/store';
import canListen from 'components/events/canListen';
import eventConfig from 'configs/eventConfig';
import canEmit from 'components/events/canEmit';
import isGameEntity from 'components/entities/isGameEntity';

const createDoubleRAF = (pos) => {
    const state = {};
    let startTime;
    const duration = 15;

    function __constructor() {
        state.type = 'powerup';
        state.createSpriteFromKey(store.world.getScene(), 'powerup_doubleraf');
        state.setPosition(pos);
        state.setColliderShape(Matter.Bodies.circle(state.getX(), state.getY(), 25));
        state.setCollisionCategory(gameConfig.COLLISION.powerup);
        state.addCollidesWith(gameConfig.COLLISION.player);
        state.listenOn(state, eventConfig.COLLISION.START, (e) => {
            state.activate(e.entity);
        });

        store.game.addEntity(state);
    }

    function activate(entity) {
        // remove from world.
        const sprite = state.getSprite();
        if (sprite) sprite.destroy();
        store.game.removeEntity(state);

        entity.addPowerup(state);
        // let player know about the effect, duration etc.
    }

    function update(time) {
        // Update any effects (visual, etc.)
        // if duration is over, delete self.
    }

    function isActive() {
        return performance.now() > startTime + duration;
    }

    const localState = {
        __constructor,
        update,
        activate,
        isActive,
    };

    return createState('powerup', state, {
        localState,
        isGameEntity: isGameEntity(state),
        canListen: canListen(state),
        canEmit: canEmit(state),
        hasPosition: hasPosition(state),
        hasSprite: hasSprite(state),
        hasCollision: hasCollision(state),
    });
};

export default createDoubleRAF;
