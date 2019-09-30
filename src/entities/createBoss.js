import createState from 'utils/createState';
import hasSprite from 'components/entities/hasSprite';
import hasPosition from 'components/hasPosition';
import store from 'src/store';
import spriteConfig from 'configs/spriteConfig';
import hasCollision from 'components/entities/hasCollision';
import gameConfig from 'configs/gameConfig';
import Matter from 'matter-js';
import isGameEntity from 'components/entities/isGameEntity';
import canEmit from 'components/events/canEmit';
import canListen from 'components/events/canListen';
import hasHealth from 'components/entities/hasHealth';
import normalizeRange from 'src/math/normalizeRange';
import createBullet from './createBullet';
import Vector from 'src/math/vector';

const createBoss = (pos) => {
    const state = {};

    const healthConfig = {};
    let theta = 0;

    let timeOfLastShot = 0;
    const rateOfFire = 1.5;

    function __constructor() {
        state.createSpriteFromAtlas(store.world.getScene(), spriteConfig.SHIPPACK.KEY, 'spaceShips_005.png');
        state.setRotation(Math.PI / 2);
        state.setPosition(pos);

        const collisionRadius = 100;
        state.setColliderShape(Matter.Bodies.circle(state.getX(), state.getY(), collisionRadius));
        state.setVisionRadius(collisionRadius);
        state.setCollisionCategory(gameConfig.COLLISION.enemy);
        state.setCollidesWith([gameConfig.COLLISION.bullet, gameConfig.COLLISION.player]);

        store.game.addEntity(state);
    }

    function shoot() {
        const now = performance.now();
        if (now - timeOfLastShot > 1000 / rateOfFire) {
            const p = new Vector().copy(state.getPosition());
            const playerPos = store.player.getPosition();
            const direction = new Vector()
                .copy(playerPos)
                .sub(p)
                .getUnit();

            const gunPos = new Vector(p.x, p.y);
            const bullet = createBullet(gunPos, direction, gameConfig.TYPES.ENEMY);
            bullet.setCollidesWith([gameConfig.COLLISION.player]);
            bullet.setCollisionCategory(gameConfig.COLLISION.enemyBullet);

            timeOfLastShot = performance.now();

            // console.log('shoot');
        }
    }

    function update(time) {
        theta += 0.01 * time.deltaScale;
        const y = normalizeRange(Math.sin(theta), -1, 1, 200, gameConfig.GAME.VIEWHEIGHT - 200);
        state.setPosition({ x: state.getX(), y });

        shoot();

        return time;
    }

    const localState = {
        __constructor,
        update,
    };

    return createState('boss', state, {
        localState,
        canEmit: canEmit(state),
        canListen: canListen(state),
        isGameEntity: isGameEntity(state),
        hasPosition: hasPosition(state),
        hasSprite: hasSprite(state),
        hasCollision: hasCollision(state),
        hasHealth: hasHealth(state, healthConfig),
    });
};

export default createBoss;
