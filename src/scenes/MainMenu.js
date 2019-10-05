import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import createButton from 'entities/createButton';
import canListen from 'components/events/canListen';
import eventConfig from 'configs/eventConfig';
import canEmit from 'components/events/canEmit';
import store from 'src/store';
import prettifyIntegerToString from 'utils/prettifyIntegerToString';

/**
 * Layer/Scene for world elements.
 */

const MainMenu = function MainMenuFunc() {
    const state = {};
    let playButton;
    let title;
    let instructions;
    let story;
    let credits;

    function startGame() {
        state.emitGlobal(eventConfig.GAME.STARTED);
    }

    function create() {
        playButton = createButton(state.getScene());
        playButton.setText('PLAY');
        playButton.setSize({ w: 300, h: 100 });
        playButton.setPosition({ x: (gameConfig.GAME.VIEWWIDTH / 2) - 150, y: 700 });
        state.listenOn(playButton, eventConfig.BUTTON.CLICK, startGame);
        playButton.refresh();

        title = state.getScene().add.text(
            gameConfig.GAME.VIEWWIDTH / 2,
            50,
            'Asteroid Capitalist',
            gameConfig.TITLE_TEXT_STYLE,
        );
        title.setX(title.x - title.width / 2);

        let storyText = 'Our solar system has been emptied of valueable minerals, and resources are getting scarce. Venture capitalists have hired every available space mining company to travel across the galaxy and find resources. \n\nThis hunt for profit has sparked a lawless war in the outer edges of our galaxy. You are the sole solicitor of one of these mining companies and have to survive your trip back to our solar system. The company is willing to pay a bounty for every opposing company ship you encounter and take out.';
        if (store.score > 0) {
            storyText = `\n\n\nCongratulations, you earned\n\n $ ${prettifyIntegerToString(store.score)}`;
        }
        story = state.getScene().add.text(
            gameConfig.GAME.VIEWWIDTH / 2,
            250,
            storyText,
            gameConfig.STORY_TEXT_STYLE,
        );
        story.setX(story.x - story.width / 2);

        instructions = state.getScene().add.text(
            gameConfig.GAME.VIEWWIDTH / 2,
            820,
            'Use wasd or arrow keys to move\nAim and shoot with the mouse',
            gameConfig.INSTRUCTIONS_TEXT_STYLE,
        );
        instructions.setX(instructions.x - instructions.width / 2);


        credits = state.getScene().add.text(
            gameConfig.GAME.VIEWWIDTH / 2,
            gameConfig.GAME.VIEWHEIGHT - 50,
            'Created by Sidaroth and Garlov. Big thanks to Kenney.nl for most of the game assets, and to Unfa for some awesome explosion sfx',
            gameConfig.CREDITS_TEXT_STYLE,
        );
        credits.setX(credits.x - credits.width / 2);
    }

    function destroy() {
        playButton.destroy();
        playButton = undefined;
        title.destroy();
        title = undefined;
        story.destroy();
        story = undefined;
        instructions.destroy();
        instructions = undefined;
        credits.destroy();
        credits = undefined;
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
