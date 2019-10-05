import createState from 'utils/createState';
import isPowerup from 'components/isPowerup';
import isGameEntity from 'components/entities/isGameEntity';
import canListen from 'components/events/canListen';
import canEmit from 'components/events/canEmit';
import hasPosition from 'components/hasPosition';
import hasSprite from 'components/entities/hasSprite';
import hasCollision from 'components/entities/hasCollision';
import store from 'src/store';
import spriteConfig from 'configs/spriteConfig';
import Phaser from 'phaser';
import audioConfig from 'configs/audioConfig';
import expirationTween from 'src/tweens/expirationTween';

const createShield = (pos) => {
    const state = {};
    let sprite;
    let aboutToExpire = false;

    function __constructor() {
        state.createSpriteFromKey(store.world.getScene(), spriteConfig.POWERUP_SHIELD_ICON.KEY);
        state.setPosition(pos);
        state.setDuration(7500);
    }

    function activate() {
        state.entity.setImmune(true);
        const world = store.world.getScene();
        sprite = new Phaser.GameObjects.Sprite(world, state.entity.getX(), state.entity.getY(), spriteConfig.SHIELD.KEY);
        world.add.existing(sprite);
        store.audioManager.playSfx(audioConfig.SFX.SHIELD_UP.KEY, 6);
    }

    function deactivate() {
        store.audioManager.playSfx(audioConfig.SFX.SHIELD_DOWN.KEY, 6);
        state.entity.setImmune(false);
        sprite.destroy();
    }

    function toggleExpirationTween() {
        aboutToExpire = true;
        const repeats = 10;
        expirationTween(sprite, store.game.getScene(), state.duration * 0.25 / repeats, repeats);
    }

    function update(time) {
        if (sprite) {
            sprite.x = state.entity.getX();
            sprite.y = state.entity.getY();
            sprite.rotation += 0.05 * time.deltaScale;
        }

        if (!aboutToExpire && state.lifeTime > state.duration * 0.75) {
            toggleExpirationTween();
        }

        return time;
    }

    const localState = {
        __constructor,
        activate,
        deactivate,
        update,
    };

    return createState('shieldPowerup', state, {
        localState,
        isPowerup: isPowerup(state),
        isGameEntity: isGameEntity(state),
        canListen: canListen(state),
        canEmit: canEmit(state),
        hasPosition: hasPosition(state),
        hasSprite: hasSprite(state),
        hasCollision: hasCollision(state),
    });
};

export default createShield;
