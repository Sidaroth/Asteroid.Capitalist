import createState from 'utils/createState';
import hasPosition from 'components/hasPosition';
import hasSprite from 'components/entities/hasSprite';
import spriteConfig from 'configs/spriteConfig';
import store from 'src/store';

const createExplosion = () => {
    const state = {};

    function __constructor() {
        state.createSpriteFromAtlas(store.world.getScene(), spriteConfig.EXPLOSIONPACK.KEY);
        state.playAnimation('explosion');

        state.getSprite().once('animationcomplete', () => {
            state.destroy();
        });
    }

    const localState = {
        __constructor,
    };

    return createState('Explosion', state, {
        localState,
        hasPosition: hasPosition(state),
        hasSprite: hasSprite(state),
    });
};

export default createExplosion;
