import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import createParallaxBackground from 'entities/createParallaxBackground';

/**
 * Layer/Scene for background elements.
 */

const Background = function BackgroundFunc() {
    const state = {};
    let parallaxBackground;

    function create() {
        parallaxBackground = createParallaxBackground();
    }

    function update(time) {
        parallaxBackground.update(time);
        return time;
    }

    function destroy() {
        parallaxBackground.destroy();
        parallaxBackground = undefined;
    }

    const localState = {
        // methods
        create,
        update,
        destroy,
    };

    return createState('BackgroundScene', state, {
        localState,
        isScene: isScene(state, gameConfig.SCENES.BACKGROUND),
    });
};

export default Background;
