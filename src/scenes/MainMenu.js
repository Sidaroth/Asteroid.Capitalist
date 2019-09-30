import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import createButton from 'entities/createButton';
import canListen from 'components/events/canListen';
import eventConfig from 'configs/eventConfig';
import canEmit from 'components/events/canEmit';

/**
 * Layer/Scene for world elements.
 */

const MainMenu = function MainMenuFunc() {
    const state = {};
    let playButton;

    function startGame() {
        state.emitGlobal(eventConfig.GAME.STARTED);
    }

    function create() {
        playButton = createButton(state.getScene());
        playButton.setText('PLAY');
        playButton.setSize({ w: 300, h: 100 });
        playButton.setPosition({ x: (gameConfig.GAME.VIEWWIDTH / 2) - 150, y: (gameConfig.GAME.VIEWHEIGHT / 4) * 3 });
        state.listenOn(playButton, eventConfig.BUTTON.CLICK, startGame);
        playButton.refresh();
    }

    function destroy() {
        playButton.destroy();
        playButton = undefined;
    }

    const localState = {
        // methods
        create,
        destroy,
    };

    return createState('MainMenuScene', state, {
        localState,
        isScene: isScene(state, gameConfig.SCENES.MAINMENU),
        canListen: canListen(state),
        canEmit: canEmit(state),
    });
};

export default MainMenu;
