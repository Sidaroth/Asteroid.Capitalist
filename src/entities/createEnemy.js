import createState from 'utils/createState';
import canEmit from 'components/events/canEmit';
import hasPosition from 'components/hasPosition';
import hasSprite from 'components/entities/hasSprite';
import canListen from 'components/events/canListen';
import store from 'root/store';
import isGameEntity from 'components/entities/isGameEntity';

const createEnemy = (pos) => {
    const state = {};

    function __constructor() {
        state.createSpriteFromKey(store.game.getScene(), 'Enemy');
        state.setPosition(pos);
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
    });
};

export default createEnemy;
