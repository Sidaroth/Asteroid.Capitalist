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
import audioConfig from 'configs/audioConfig';
import eventConfig from 'configs/eventConfig';
import createExplosion from './createExplosion';

const createBoss = (pos, config) => {
    const state = {};

    const healthConfig = {
        health: config.health,
    };
    let theta = 0;

    let timeOfLastShot = 0;
    const rateOfFire = 2;

    function __constructor() {
        state.createSpriteFromAtlas(store.world.getScene(), spriteConfig.SHIPPACK.KEY, 'spaceShips_005.png');
        state.setRotation(Math.PI / 2);
        state.setPosition(pos.clone().add(800));

        const collisionRadius = 100;
        state.setColliderShape(Matter.Bodies.circle(state.getX(), state.getY(), collisionRadius));
        state.setVisionRadius(collisionRadius);
        state.setCollisionCategory(gameConfig.COLLISION.enemy);
        state.setCollidesWith([gameConfig.COLLISION.bullet, gameConfig.COLLISION.player]);
        store.game.addEntity(state);
        store.audioManager.playSfx(audioConfig.SFX.SIREN.KEY, 2);

        state.listenOn(state, eventConfig.ENTITY.DIE, (e) => {
            if (e.lives <= 0) {
                const explosion = createExplosion();
                explosion.setPosition(state.getPosition());
                explosion.setScale(3);
                state.destroy();
            }
        });
    }

    function shoot() {
        const now = performance.now();
        if (now - timeOfLastShot > 1000 / rateOfFire) {
            const p = new Vector().copy(state.getPosition());
            const playerPos = store.player.getPosition();
            const topGunPos = new Vector(p.x - 90, p.y - 40);

            // for the top gun.
            const topDirection = new Vector()
                .copy(playerPos)
                .sub(topGunPos)
                .getUnit();
            createBullet(topGunPos, topDirection, gameConfig.TYPES.ENEMY);

            const bottomGunPos = new Vector(p.x - 90, p.y + 40);
            const bottomDirection = new Vector()
                .copy(playerPos)
                .sub(bottomGunPos)
                .getUnit();
            createBullet(bottomGunPos, bottomDirection, gameConfig.TYPES.ENEMY);
            store.audioManager.playSfx(audioConfig.SFX.LASER.KEY, 0.5);

            timeOfLastShot = performance.now();
        }
    }

    function update(time) {
        theta += 0.01 * time.deltaScale;
        const y = normalizeRange(Math.sin(theta), -1, 1, 200, gameConfig.GAME.VIEWHEIGHT - 200);
        let x = state.getX();

        if (x > pos.x) x -= 3 * time.deltaScale;

        state.setPosition({ x, y });

        // Don't shoot at the player until we're on the screen.
        if (x < gameConfig.GAME.VIEWWIDTH - 150) {
            shoot();
        }

        return time;
    }

    const localState = {
        __constructor,
        update,
    };

    return createState('Boss', state, {
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
