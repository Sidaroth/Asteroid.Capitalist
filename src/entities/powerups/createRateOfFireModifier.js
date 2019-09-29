import createState from 'utils/createState';
import hasPosition from 'components/hasPosition';
import hasSprite from 'components/entities/hasSprite';
import hasCollision from 'components/entities/hasCollision';
import store from 'src/store';
import canListen from 'components/events/canListen';
import canEmit from 'components/events/canEmit';
import isGameEntity from 'components/entities/isGameEntity';
import isPowerup from 'components/isPowerup';

const createRateOfFireModifier = (pos) => {
    const state = {};
    const modifier = 8;

    function __constructor() {
        state.createSpriteFromKey(store.world.getScene(), 'powerup_doubleraf');
        state.setPosition(pos);
        state.setDuration(10000);
    }

    function activate() {
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

    return createState('powerup', state, {
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
