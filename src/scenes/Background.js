import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';

/**
 * Layer/Scene for background elements.
 */

const Background = function BackgroundFunc() {
    const state = {};

    function create() {
    }

    function destroy() {
    }

    const localState = {
        // methods
        create,
        destroy,
    };

    return createState('BackgroundScene', state, {
        localState,
        isScene: isScene(state, gameConfig.SCENES.BACKGROUND),
    });
};

export default Background;
