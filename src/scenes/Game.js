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
import enemyFactory from 'entities/createLevelMaster';
import createParallaxBackground from 'entities/createParallaxBackground';
import Background from './Background';
import World from './World';
import levels from 'configs/levels';
import createRateOfFireModifier from 'entities/powerups/createRateOfFireModifier';
import Vector from 'src/math/vector';
import createShield from 'entities/powerups/createShield';
import createBoss from 'entities/createBoss';
import clamp from 'src/math/clamp';

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
const Game = function GameFunc() {
    const state = {};
    let audioManager;
    let UIScene;
    let backgroundScene;
    let world;
    const keyboard = createKeyboard();
    let parallaxBackground;

    // TODO: Move into world1/level1 scene, not the global world.
    const gameEntities = [];
    const qTree = createQuadTree(new Rect(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT), 1, 8); // Specify world bounds.
    let gfxContext;

    function cameraSetup() {
        state.getScene().cameras.main.setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        // state.getScene().cameras.main.setZoom(0.95); // remove?
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
        keyboard.enable();
        store.keyboard = keyboard;

        state.getScene().input.on('pointermove', (pointer) => {
            store.mouse = pointer;
        });
    }

    function init() {
        // After assets are loaded.
        backgroundScene = Background();
        store.backgroundScene = backgroundScene;
        world = World();
        store.world = world;
        UIScene = UI();
        store.UIScene = UIScene;
        state.getScene().scene.add(gameConfig.SCENES.BACKGROUND, backgroundScene.getScene(), true);
        state.getScene().scene.add(gameConfig.SCENES.WORLD, world.getScene(), true);
        state.getScene().scene.add(gameConfig.SCENES.UI, UIScene.getScene(), true);
        state.getScene().scene.bringToTop(UIScene.getScene());
        audioManager = AudioManager(UIScene.getScene());
        store.audioManager = audioManager;
        gfxContext = UIScene.getScene().add.graphics();

        createInput();

        parallaxBackground = createParallaxBackground();

        enemyFactory.readSpawnConfig(levels.level1);

        const RAF = createRateOfFireModifier(new Vector(gameConfig.GAME.VIEWWIDTH / 2, 400));
        const shield = createShield(new Vector(gameConfig.GAME.VIEWWIDTH / 2, 800));
        const boss = createBoss(new Vector(1600, 400));

        const player = createPlayer();
        store.player = player;
        gameEntities.push(player);
        qTree.insert(player);
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

        parallaxBackground.update(time);
        enemyFactory.update(time);

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
