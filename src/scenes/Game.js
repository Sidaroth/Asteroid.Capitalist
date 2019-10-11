import gameConfig from 'configs/gameConfig';
import AudioManager from 'core/createAudioManager';
import UI from 'scenes/UI';
import canListen from 'components/events/canListen';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import createQuadTree from '../quadTree/createQuadTree';
import Rect from '../quadTree/rect';
import createKeyboard from 'core/createKeyboard';
import store from 'root/store';
import Background from './Background';
import World from './World';
import MainMenu from './MainMenu';
import eventConfig from 'configs/eventConfig';
import createGamepad from 'core/createGamepad';
import createMouse from 'core/createMouse';

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
const Game = function GameFunc() {
    const state = {};
    let audioManager;
    let UIScene;
    let backgroundScene;
    let world;
    let mainMenu;
    const keyboard = createKeyboard();
    const gamepad = createGamepad();
    const mouse = createMouse();

    const gameEntities = [];
    const qTree = createQuadTree(new Rect(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT), 1, 8); // Specify world bounds.
    let gfxContext;

    function cameraSetup() {
        state.getScene().cameras.main.setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
    }

    function addEntity(entity) {
        gameEntities.push(entity);
        qTree.insert(entity);
    }

    function removeEntity(entity) {
        const idx = gameEntities.findIndex(e => e.id === entity.id);
        gameEntities.splice(idx, 1);
        // qTree.remove(entity); // Because we're currently reinserting every frame, we can ignore this until next update.
    }

    function createInput() {
        mouse.enable(state.getScene());
        keyboard.enable();
        gamepad.enable();
        store.keyboard = keyboard;
    }

    function init() {
        // After assets are loaded.
        backgroundScene = Background();
        store.backgroundScene = backgroundScene;
        mainMenu = MainMenu();
        UIScene = UI();
        store.UIScene = UIScene;
        state.getScene().scene.add(gameConfig.SCENES.BACKGROUND, backgroundScene.getScene(), true);
        state.getScene().scene.add(gameConfig.SCENES.MAINMENU, mainMenu.getScene(), true);
        state.getScene().scene.add(gameConfig.SCENES.UI, UIScene.getScene(), true);
        state.getScene().scene.bringToTop(UIScene.getScene());
        audioManager = AudioManager(UIScene.getScene());
        store.audioManager = audioManager;
        gfxContext = UIScene.getScene().add.graphics();

        state.listenGlobal(eventConfig.GAME.STARTED, () => {
            world = World();
            store.world = world;
            state.getScene().scene.add(gameConfig.SCENES.WORLD, world.getScene(), true);
            state.getScene().scene.remove(mainMenu.getScene());
            mainMenu.getScene().destroy();
            mainMenu = undefined;
            document.getElementById('game').style.cursor = 'none';
        });

        state.listenGlobal(eventConfig.GAME.ENDED, () => {
            mainMenu = MainMenu();
            state.getScene().scene.add(gameConfig.SCENES.MAINMENU, mainMenu.getScene(), true);
            state.getScene().scene.remove(world.getScene());
            world.getScene().destroy();
            world = undefined;
            store.world = undefined;
            document.getElementById('game').style.cursor = 'default';
        });

        createInput();
    }

    function create() {
        audioManager.playMusic();
        cameraSetup();
    }

    function getEntityTree() {
        return qTree;
    }

    function getGFXContext() {
        return gfxContext;
    }

    function getUIScene() {
        return UIScene;
    }

    function update(time) {
        gfxContext.clear();
        qTree.clear();
        qTree.insertAll(gameEntities);

        backgroundScene.update(time);
        if (world) {
            world.update(time);
        }

        gameEntities.forEach((entity) => {
            entity.update(time);
        });

        if (UIScene.getGUIController() && UIScene.getGUIController().object.renderQTree) {
            qTree.render(gfxContext);
        }
        return time;
    }

    function destroy() {
        if (UIScene) UIScene.destroy();
        if (qTree) qTree.clear();
    }

    const localState = {
        // props
        // methods
        addEntity,
        removeEntity,
        init,
        create,
        update,
        destroy,
        getEntityTree,
        getUIScene,
        // Debug,
        getGFXContext,
    };

    return createState('Game', state, {
        localState,
        canListen: canListen(state),
        isScene: isScene(state, gameConfig.SCENES.GAME),
    });
};

export default Game;
