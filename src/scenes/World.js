import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';

/**
 * Layer/Scene for world elements.
 */

const World = function WorldFunc() {
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

    return createState('WorldScene', state, {
        localState,
        isScene: isScene(state, gameConfig.SCENES.WORLD),
    });
};

export default World;
