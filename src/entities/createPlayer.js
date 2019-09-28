import isGameEntity from 'components/entities/isGameEntity';
import canEmit from 'components/events/canEmit';
import hasPosition from 'components/hasPosition';
import createState from 'utils/createState';
import hasInput from 'components/hasInput';
import canListen from 'components/events/canListen';
import Vector from 'root/math/vector';
import keybindings from 'configs/keybindings';
import hasSprite from 'components/entities/hasSprite';
import gameConfig from 'configs/gameConfig';
import store from 'root/store';
import createBullet from './createBullet';
import hasHealth from 'components/entities/hasHealth';
import hasCollision from 'components/entities/hasCollision';
import Matter from 'matter-js';
import Phaser from 'phaser';
import spriteConfig from 'configs/spriteConfig';
import eventConfig from 'configs/eventConfig';

const createPlayer = function createPlayerFunc() {
    // variables and functions here are private unless listed below in localState.
    const state = {};
    const velocity = new Vector();
    const acceleration = new Vector();

    let accelerationForceMag = 5;
    let maxSpeed = 10;
    let rateOfFire = 15; // Per second.
    let timeOfLastShot = 0;
    let facingDirection;

    const livesIcons = [];

    // Drag
    let airDensity = 0.05; // We're in space after all....

    function createSprite() {
        state.createSpriteFromKey(store.game.getScene(), 'Ship');
    }

    function __constructor() {
        state.type = 'player';
        createSprite();
        state.setPosition({ x: gameConfig.GAME.VIEWWIDTH / 2, y: gameConfig.GAME.VIEWHEIGHT / 2 });
        state.setColliderShape(Matter.Bodies.circle(state.getX(), state.getY(), 25));
        state.setCollisionCategory(gameConfig.COLLISION.player);
        state.setCollidesWith([gameConfig.COLLISION.enemies]); // TODO: Enemy bullets, but not our own.
        for (let i = 0; i < state.getLives(); i += 1) {
            const icon = store.game.getScene().add.image(30 + (80 * i), 30, spriteConfig.PLAYER_SHIP_ICON.KEY);
            livesIcons.push(icon);
        }

        state.listenOn(state, eventConfig.ENTITY.DIE, (e) => {
            livesIcons.forEach((icon, index) => {
                if (e.lives > index) {
                    icon.setVisible(true);
                } else {
                    icon.setVisible(false);
                }
            });
        });
    }

    function calculateDrag(fluidDensity) {
        const speed = velocity.getLength();
        const dragMagnitude = fluidDensity * 0.1 * speed * speed;
        const drag = Vector.inverse(velocity).getUnit(); // Drag acts inversely on velocity.
        drag.multiply(dragMagnitude);

        acceleration.add(drag);
    }

    function checkMovement() {
        const input = new Array(4).fill(false);
        Object.keys(keybindings.MOVEMENT).forEach((key, direction) => {
            input[direction] = state.isInputDown(...keybindings.MOVEMENT[key]);
        });

        // TODO: Constify indices here.
        const accel = new Vector();
        if (input[0]) accel.add(0, -accelerationForceMag);
        if (input[1]) accel.add(0, accelerationForceMag);
        if (input[2]) accel.add(-accelerationForceMag, 0);
        if (input[3]) accel.add(accelerationForceMag, 0);

        acceleration.add(accel);
    }

    function lookAt(pos) {
        const sprite = state.getSprite();
        if (sprite && pos) {
            facingDirection = Vector.sub(new Vector(pos.x, pos.y), new Vector(state.getX(), state.getY())).getUnit();
            sprite.rotation = facingDirection.angle();
        }
    }

    function shoot() {
        if (store.mouse && store.mouse.isDown) {
            const now = Date.now();
            if (now - timeOfLastShot > 1000 / rateOfFire) {
                timeOfLastShot = now;

                const pos = state.getPosition();
                createBullet(new Vector(pos.x, pos.y).add(facingDirection.clone().multiply(15)), facingDirection);
            }
        }
    }

    function update(time) {
        acceleration.zero();
        checkMovement();
        calculateDrag(airDensity);
        acceleration.multiply(time.deltaScale);
        velocity.add(acceleration);
        velocity.limit(maxSpeed);

        const pos = state.getPosition();
        pos.x += velocity.x * time.deltaScale;
        pos.y += velocity.y * time.deltaScale;

        if (pos.x < 0) pos.x = 0;
        if (pos.x > gameConfig.GAME.VIEWWIDTH) pos.x = gameConfig.GAME.VIEWWIDTH;
        if (pos.y < 0) pos.y = 0;
        if (pos.y > gameConfig.GAME.VIEWHEIGHT) pos.y = gameConfig.GAME.VIEWHEIGHT;

        state.setPosition(pos);

        lookAt(store.mouse);
        shoot();
        return time;
    }

    function setMaxSpeed(speed) {
        maxSpeed = speed;
    }

    function setRateOfFire(ROF) {
        rateOfFire = ROF;
    }

    function setAccelerationForceMagnitude(forceMag) {
        accelerationForceMag = forceMag;
    }

    function getAirDensity() {
        return airDensity;
    }

    function setAirDensity(t) {
        airDensity = t;
    }

    // functions and properties listed here will be public.
    const localState = {
        // props
        // methods
        __constructor,
        update,
        setMaxSpeed,
        setRateOfFire,
        setAccelerationForceMagnitude,
        getAirDensity,
        setAirDensity,
    };

    // These are the substates, or components, that describe the functionality of the resulting object.
    return createState('Player', state, {
        localState,
        isGameEntity: isGameEntity(state),
        hasPosition: hasPosition(state),
        canEmit: canEmit(state),
        canListen: canListen(state),
        hasInput: hasInput(state),
        hasSprite: hasSprite(state),
        hasHealth: hasHealth(state, gameConfig.PLAYER.HEALTHCONFIG),
        hasCollision: hasCollision(state),
    });
};

export default createPlayer;
