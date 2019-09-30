import createState from 'utils/createState';
import canEmit from 'components/events/canEmit';
import isGameEntity from 'components/entities/isGameEntity';
import hasSprite from 'components/entities/hasSprite';
import hasPosition from 'components/hasPosition';
import store from 'root/store';
import hasCollision from 'components/entities/hasCollision';
import Matter from 'matter-js';
import gameConfig from 'configs/gameConfig';
import canListen from 'components/events/canListen';
import eventConfig from 'configs/eventConfig';
import spriteConfig from 'configs/spriteConfig';

const createBullet = (pos, direction, type = undefined) => {
    const state = {};
    const speed = 15;
    const velocity = direction.clone().setLength(speed);
    const lifeTime = 3; // in Seconds.

    let creationTime;

    function createSprite() {
        if (type === gameConfig.TYPES.ENEMY) {
            state.createSpriteFromKey(store.world.getScene(), spriteConfig.BLUE_LASER.KEY);
        } else {
            state.createSpriteFromKey(store.world.getScene(), spriteConfig.LASER.KEY);
        }

        state.setRotation(direction.angle());
    }

    function __constructor() {
        state.type = gameConfig.TYPES.BULLET;
        creationTime = Date.now();
        state.setPosition(pos);
        createSprite();
        state.setColliderShape(Matter.Bodies.circle(state.getX(), state.getY(), 5));

        if (type === gameConfig.TYPES.ENEMY) {
            state.setCollidesWith([gameConfig.COLLISION.player]);
            state.setCollisionCategory(gameConfig.COLLISION.enemyBullet);
        } else {
            state.setCollisionCategory(gameConfig.COLLISION.bullet);
            state.setCollidesWith([gameConfig.COLLISION.enemy]);
        }

        state.listenOn(state, eventConfig.COLLISION.START, (e) => {
            state.destroy();
        });

        store.game.addEntity(state);
    }

    function update(time) {
        const position = state.getPosition();
        position.x += velocity.x * time.deltaScale;
        position.y += velocity.y * time.deltaScale;
        state.setPosition(position);

        if (Date.now() - creationTime > lifeTime * 1000) {
            // TODO: Set inactive and reuseable in some bullet pool instead.
            state.destroy();
        }

        return time;
    }

    function destroy() {
        store.game.removeEntity(state);
    }

    const localState = {
        __constructor,
        update,
        destroy,
    };

    return createState('Bullet', state, {
        localState,
        isGameEntity: isGameEntity(state),
        canEmit: canEmit(state),
        canListen: canListen(state),
        hasPosition: hasPosition(state),
        hasSprite: hasSprite(state),
        hasCollision: hasCollision(state),
    });
};

export default createBullet;
