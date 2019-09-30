import createState from 'utils/createState';
import hasPosition from 'components/hasPosition';
import hasSprite from 'components/entities/hasSprite';
import hasCollision from 'components/entities/hasCollision';
import store from 'src/store';
import canListen from 'components/events/canListen';
import canEmit from 'components/events/canEmit';
import isGameEntity from 'components/entities/isGameEntity';
import isPowerup from 'components/isPowerup';
import spriteConfig from 'configs/spriteConfig';
import audioConfig from 'configs/audioConfig';

const createRateOfFireModifier = (pos) => {
    const state = {};
    const modifier = 2;

    function __constructor() {
        state.createSpriteFromKey(store.world.getScene(), spriteConfig.POWERUP_DOUBLEROF.KEY);
        state.setPosition(pos);
        state.setDuration(10000);
    }

    function activate() {
        store.audioManager.playSfx(audioConfig.SFX.DOUBLE_ROF.KEY, 5);
        state.entity.setROFModifier(modifier);
    }

    function deactivate() {
        state.entity.setROFModifier(1);
    }

    const localState = {
        __constructor,
        deactivate,
        activate,
    };

    return createState('ROFPowerup', state, {
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

export default createRateOfFireModifier;
