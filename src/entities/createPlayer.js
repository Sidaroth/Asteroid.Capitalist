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
import spriteConfig from 'configs/spriteConfig';
import eventConfig from 'configs/eventConfig';
import createExplosion from './createExplosion';
import audioConfig from 'configs/audioConfig';
import prettifyIntegerToString from 'utils/prettifyIntegerToString';
import Phaser from 'phaser';

const createPlayer = function createPlayerFunc() {
    // variables and functions here are private unless listed below in localState.
    const state = {};
    const velocity = new Vector();
    const acceleration = new Vector();

    let accelerationForceMag = 1.5;
    let maxSpeed = 7.5;
    let rateOfFire = 5; // Per second.
    let timeOfLastShot = 0;
    let facingDirection;
    let scoreText;

    const edgeOffset = 50;

    // powerups.
    let ROFModifier = 1;

    const invulnerableBlinkTime = 100;
    let lastBlink = performance.now();

    let livesIcons = [];
    let activePowerups = [];
    let crosshair;

    // Drag
    let airDensity = 0.05; // We're in space after all....

    function createSprite() {
        state.createSpriteFromAtlas(store.world.getScene(), spriteConfig.SHIPPACK.KEY, 'playerShip2_green.png');

        const uiScene = store.UIScene.getScene();
        const crosshairX = store.mouse && store.mouse.phaserPointer ? store.mouse.phaserPointer.x : gameConfig.GAME.VIEWWIDTH / 2;
        const crosshairY = store.mouse && store.mouse.phaserPointer ? store.mouse.phaserPointer.y : gameConfig.GAME.VIEWHEIGHT / 2;
        crosshair = new Phaser.GameObjects.Sprite(uiScene, crosshairX, crosshairY, spriteConfig.CROSSHAIR.KEY);
        crosshair.setOrigin(0.5);
        uiScene.add.existing(crosshair);
    }

    function prettyScoreString() {
        return prettifyIntegerToString(store.score);
    }

    function setupListeners() {
        state.listenOn(state, eventConfig.ENTITY.DIE, (e) => {
            const explosion = createExplosion();
            explosion.setPosition(state.getPosition());
            state.setPosition({ x: -500, y: -500 });
            livesIcons.forEach((icon, index) => {
                if (e.lives > index) {
                    icon.setVisible(true);
                } else {
                    icon.setVisible(false);
                }
            });
            if (e.lives <= 0) {
                state.emitGlobal(eventConfig.GAME.ENDED);
            }
        });

        state.listenGlobal(eventConfig.ENTITY.SCOREAWARDED, (score) => {
            store.score += score;
            scoreText.text = `$ ${prettyScoreString()}`;
        });

        state.listenGlobal(eventConfig.MOUSE.MOVE, (p) => {
            if (crosshair) {
                crosshair.x = p.x;
                crosshair.y = p.y;
            }
        });
    }

    function __constructor() {
        store.score = 0;
        state.type = gameConfig.TYPES.PLAYER;
        createSprite();

        state.setPosition({ x: gameConfig.GAME.VIEWWIDTH / 2, y: gameConfig.GAME.VIEWHEIGHT / 2 });
        state.setColliderShape(Matter.Bodies.circle(state.getX(), state.getY(), 35));
        state.setCollisionCategory(gameConfig.COLLISION.player);
        state.setCollidesWith([gameConfig.COLLISION.enemy]);

        scoreText = store.UIScene.getScene().add.text(700, 10, `$ ${prettyScoreString()}`, gameConfig.DEFAULT_TEXT_STYLE);
        for (let i = 0; i < state.getLives(); i += 1) {
            const icon = store.UIScene.getScene().add.image(30 + 80 * i, 30, spriteConfig.PLAYER_SHIP_ICON.KEY);
            livesIcons.push(icon);
        }

        setupListeners();
    }

    function calculateDrag(fluidDensity) {
        const speed = velocity.getLength();
        const dragMagnitude = fluidDensity * 0.1 * speed * speed;
        const drag = Vector.inverse(velocity).getUnit(); // Drag acts inversely on velocity.
        drag.multiply(dragMagnitude);

        acceleration.add(drag);
    }

    function checkMovement() {
        const keyboardInput = new Array(4).fill(false);
        Object.keys(keybindings.MOVEMENT).forEach((key, direction) => {
            keyboardInput[direction] = state.isBoundKeyDown(...keybindings.MOVEMENT[key]);
        });

        const accel = new Vector();
        if (keyboardInput.some(val => val)) {
            if (keyboardInput[gameConfig.CONSTS.DIRECTION.UP]) accel.add(0, -accelerationForceMag);
            if (keyboardInput[gameConfig.CONSTS.DIRECTION.DOWN]) accel.add(0, accelerationForceMag);
            if (keyboardInput[gameConfig.CONSTS.DIRECTION.LEFT]) accel.add(-accelerationForceMag, 0);
            if (keyboardInput[gameConfig.CONSTS.DIRECTION.RIGHT]) accel.add(accelerationForceMag, 0);
            acceleration.add(accel);
            return;
        }

        const axes = state.getGamepadAxesData();
        if (axes) {
            accel.add(0, accelerationForceMag * axes.L_VER);
            accel.add(accelerationForceMag * axes.L_HOR, 0);
            acceleration.add(accel);
        }
    }

    function lookAt(pos) {
        const sprite = state.getSprite();
        if (sprite && pos) {
            facingDirection = Vector.sub(new Vector(pos.x, pos.y), new Vector(state.getX(), state.getY())).getUnit();
            sprite.rotation = facingDirection.angle();
        }
    }

    function shoot() {
        const mouse = store.mouse ? store.mouse.phaserPointer : undefined;
        const mouseFire = mouse && mouse.isDown && mouse.button === 0;
        const gamepadData = state.getGamePadButtonData();
        const gamepadFire = gamepadData && (gamepadData.X || gamepadData.R2 || gamepadData.R1); // TODO Set gamepad binds elsewhere.

        if (mouseFire || gamepadFire) {
            const now = performance.now();
            const canShootYet = now - timeOfLastShot > 1000 / (rateOfFire * ROFModifier);

            if (canShootYet) {
                timeOfLastShot = now;

                const pos = state.getPosition();
                createBullet(new Vector(pos.x, pos.y).add(facingDirection.clone().multiply(35)), facingDirection);
                store.audioManager.playSfx(audioConfig.SFX.LASER.KEY, 0.5);
            }
        }
    }

    function checkBounds(pos) {
        const newPos = pos;
        if (pos.x < edgeOffset) newPos.x = edgeOffset;
        if (pos.x > gameConfig.GAME.VIEWWIDTH - edgeOffset) newPos.x = gameConfig.GAME.VIEWWIDTH - edgeOffset;
        if (pos.y < edgeOffset) newPos.y = edgeOffset;
        if (pos.y > gameConfig.GAME.VIEWHEIGHT - edgeOffset) newPos.y = gameConfig.GAME.VIEWHEIGHT - edgeOffset;

        return newPos;
    }

    function move(time) {
        acceleration.zero();
        checkMovement();
        calculateDrag(airDensity);
        acceleration.multiply(time.deltaScale);
        velocity.add(acceleration);
        velocity.limit(maxSpeed);

        if (velocity.squaredLength() < 0.5 * time.deltaScale) velocity.zero(); // We don't want to drift "endlessly" when the velocity is almost non-existant.

        let pos = state.getPosition();
        pos.x += velocity.x * time.deltaScale;
        pos.y += velocity.y * time.deltaScale;
        pos = checkBounds(pos);

        state.setPosition(pos);
    }

    function updateSprite() {
        if (state.isInvulnerable()) {
            if (performance.now() - lastBlink > invulnerableBlinkTime) {
                const sprite = state.getSprite();
                if (sprite.visible) {
                    sprite.setVisible(false);
                } else {
                    sprite.setVisible(true);
                }
                lastBlink = performance.now();
            }
        } else if (!state.getSprite().visible) {
            state.getSprite().setVisible(true);
        }
    }

    function updatePowerups(time) {
        activePowerups = activePowerups.filter(p => p.isActive());
        activePowerups.forEach((power) => {
            power.update(time);
        });
    }

    function updateCrosshair(time) {
        const axes = state.getGamepadAxesData();
        if (axes) {
            crosshair.x += gameConfig.GAMEPAD_MAPPING.SENSITIVITY * axes.R_HOR * time.deltaScale;
            crosshair.y += gameConfig.GAMEPAD_MAPPING.SENSITIVITY * axes.R_VER * time.deltaScale;
        }

        const edgeBound = checkBounds(crosshair);
        crosshair.x = edgeBound.x;
        crosshair.y = edgeBound.y;
    }

    function update(time) {
        if (!state.waitingForRespawn) {
            updatePowerups(time);
            move(time);
            updateCrosshair(time);
            lookAt(crosshair);
            shoot();
            updateSprite();
        }

        return time;
    }

    function setROFModifier(mod) {
        ROFModifier = mod;
    }

    function addPowerup(power) {
        activePowerups.push(power);
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

    function destroy() {
        if (scoreText) {
            scoreText.destroy();
            scoreText = undefined;
        }
        livesIcons.forEach((icon) => {
            icon.destroy();
        });
        livesIcons = [];
    }

    // functions and properties listed here will be public.
    const localState = {
        // props
        // methods
        __constructor,
        update,
        addPowerup,
        setMaxSpeed,
        setRateOfFire,
        setAccelerationForceMagnitude,
        getAirDensity,
        setAirDensity,
        destroy,
        // powerups
        setROFModifier,
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
