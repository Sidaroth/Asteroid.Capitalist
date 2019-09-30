import createState from 'utils/createState';
import hasSprite from 'components/entities/hasSprite';
import hasPosition from 'components/hasPosition';
import store from 'src/store';
import spriteConfig from 'configs/spriteConfig';

const createBoss = (pos) => {
    const state = {};

    function __constructor() {
        state.createSpriteFromAtlas(store.world.getScene(), spriteConfig.SHIPPACK.KEY, 'spaceShips_005.png');
        state.setPosition(pos);
    }

    const localState = {
        __constructor,
    };

    return createState('boss', state, {
        localState,
        hasPosition: hasPosition(state),
        hasSprite: hasSprite(state),
    });
};

export default createBoss;
