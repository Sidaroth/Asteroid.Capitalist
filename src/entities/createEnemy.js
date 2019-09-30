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
import hasHealth from 'components/entities/hasHealth';
import Vector from 'math/vector';
import spriteConfig from 'configs/spriteConfig';
import createExplosion from './createExplosion';
import getRandomInt from 'src/math/getRandomInt';
import createBullet from './createBullet';
import audioConfig from 'configs/audioConfig';

const createEnemy = (pos, conf = {}, movementFunc = undefined) => {
    const state = {};
    const available = false;
    const maxSpeed = 3;
    const velocity = new Vector(-2.5, 0);
    const killZoneLimit = -200;
    let movementFunction = movementFunc;
    const config = conf;

    const rateOfFire = getRandomInt(5, 10) / 10;
    let timeOfLastShot = 0;

    function __constructor() {
        state.available = false;
        if (config.type === 'standard') {
            state.createSpriteFromAtlas(store.world.getScene(), spriteConfig.SHIPPACK.KEY, 'spaceShips_001.png');
        } else if (config.type === 'shooting') {
            state.createSpriteFromAtlas(store.world.getScene(), spriteConfig.SHIPPACK.KEY, 'spaceShips_003.png');
        }

        state.setPosition(pos);
        state.setColliderShape(Matter.Bodies.circle(state.getX(), state.getY(), 35));
        state.setCollisionCategory(gameConfig.COLLISION.enemy);
        state.setCollidesWith([gameConfig.COLLISION.bullet, gameConfig.COLLISION.player]);
        state.setRotation(Math.PI / 2);

        state.listenOn(state, eventConfig.ENTITY.DIE, (e) => {
            if (e.lives <= 0) {
                state.emitGlobal(eventConfig.ENTITY.SCOREAWARDED, state.getMaxHealth() * 10);
                const explosion = createExplosion();
                explosion.setPosition(state.getPosition());
                state.destroy();
            }
        });
    }

    function setMovementFunction(func) {
        movementFunction = func;
    }

    function setVelocity(vel) {
        velocity.copy(vel);
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
            createBullet(p.add(direction.clone().multiply(40)), direction, gameConfig.TYPES.ENEMY);
            store.audioManager.playSfx(audioConfig.SFX.LASER.KEY, 0.5);

            timeOfLastShot = performance.now();
        }
    }

    function update(time) {
        velocity.setLength(maxSpeed);

        let newPos = new Vector(state.getX() + velocity.x * time.deltaScale, state.getY() + velocity.y * time.deltaScale);
        if (movementFunction) {
            newPos = movementFunction(newPos);
        }
        state.setPosition(newPos);

        // If the enemy is a shooting type, and it has actually moved onto the screen.
        if (config.type === 'shooting' && newPos.x < gameConfig.GAME.VIEWWIDTH - 50) {
            shoot();
        }

        if (state.getX() < killZoneLimit) state.destroy();

        return time;
    }

    function destroy() {
        store.game.removeEntity(state);
    }

    const localState = {
        available,
        // methods
        __constructor,
        destroy,
        update,
        setMovementFunction,
        setVelocity,
    };

    return createState('Enemy', state, {
        localState,
        isGameEntity: isGameEntity(state),
        canEmit: canEmit(state),
        canListen: canListen(state),
        hasPosition: hasPosition(state),
        hasSprite: hasSprite(state),
        hasCollider: hasCollision(state),
        hasHealth: hasHealth(state),
    });
};

export default createEnemy;
