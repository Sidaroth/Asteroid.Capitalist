import createState from 'utils/createState';
import canEmit from 'components/events/canEmit';
import hasPosition from 'components/hasPosition';
import hasSprite from 'components/entities/hasSprite';
import canListen from 'components/events/canListen';
import store from 'root/store';
import isGameEntity from 'components/entities/isGameEntity';
import hasCollision from 'components/entities/hasCollision';
import Matter from 'matter-js';
import gameConfig from 'configs/gameConfig';
import eventConfig from 'configs/eventConfig';

const createEnemy = (pos) => {
    const state = {};

    function __constructor() {
        state.createSpriteFromKey(store.game.getScene(), 'Enemy');
        state.setPosition(pos);
        state.setColliderShape(Matter.Bodies.circle(state.getX(), state.getY(), 25));
        state.setCollisionCategory(gameConfig.COLLISION.enemies);
        state.setCollidesWith([gameConfig.COLLISION.bullets, gameConfig.COLLISION.player]);

        // state.listenOn(state, eventConfig.COLLISION.START, e => console.log('start: ', e));
        // state.listenOn(state, eventConfig.COLLISION.END, e => console.log('end: ', e));
    }

    function update(time) {
        // stuff
        return time;
    }

    const localState = {
        __constructor,
        update,
    };

    return createState('Enemy', state, {
        localState,
        isGameEntity: isGameEntity(state),
        canEmit: canEmit(state),
        canListen: canListen(state),
        hasPosition: hasPosition(state),
        hasSprite: hasSprite(state),
        hasCollider: hasCollision(state),
    });
};

export default createEnemy;
