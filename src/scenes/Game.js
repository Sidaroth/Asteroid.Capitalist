import gameConfig from 'configs/gameConfig';
import AudioManager from 'core/createAudioManager';
import createPlayer from 'entities/createPlayer';
import UI from 'scenes/UI';
import canListen from 'components/events/canListen';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import createQuadTree from '../quadTree/createQuadTree';
import Rect from '../quadTree/rect';
import createKeyboard from 'core/createKeyboard';
import store from 'root/store';

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
const Game = function GameFunc() {
    const state = {};
    let audioManager;
    let UIScene;
    const keyboard = createKeyboard();

    // TODO: Move into world1/level1 scene, not the global world.
    const gameEntities = [];
    const qTree = createQuadTree(new Rect(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT), 1, 8); // Specify world bounds.
    let qTreeDebugContext;

    function cameraSetup() {
        state.getScene().cameras.main.setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        state.getScene().cameras.main.setZoom(0.8);
    }

    function init() {
        // After assets are loaded.
        UIScene = UI();
        state.getScene().scene.add(gameConfig.SCENES.UI, UIScene.getScene(), true);
        audioManager = AudioManager(UIScene.getScene());
        qTreeDebugContext = state.getScene().add.graphics();
        keyboard.enable();
        store.keyboard = keyboard;

        state.getScene().input.on('pointermove', (pointer) => {
            store.mouse = pointer;
        });

        const player = createPlayer();
        player.createShipTexture(state.getScene(), qTreeDebugContext);

        gameEntities.push(player);
        qTree.insert(player);
    }

    function create() {
        audioManager.playMusic();
        cameraSetup();
    }

    function update(time, delta) {
        // TODO: If there's not a lot of entities moving it's faster
        // to remove and reinsert only the dirty ones, instead of recreating the tree from scratch (.clear())
        qTree.clear();
        qTreeDebugContext.clear();
        gameEntities.forEach((entity) => {
            entity.update();
            qTree.insert(entity);
        });

        qTree.render(qTreeDebugContext);
    }

    function destroy() {
        if (UI) UI.destroy();
    }

    const localState = {
        // props
        // methods
        init,
        create,
        update,
        destroy,
    };

    return createState('Game', state, {
        localState,
        canListen: canListen(state),
        isScene: isScene(state, gameConfig.SCENES.GAME),
    });
};

export default Game;
