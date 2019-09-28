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
import Phaser from 'phaser';
import Vector from 'math/vector';
import createSine from 'math/movement/sine';
import enemyFactory from 'entities/createEnemyFactory';
import createCosine from 'math/movement/cosine';
import createSigmoid from 'math/movement/sigmoid';
import createReverseSigmoid from 'src/math/movement/reverseSigmoid';

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
    let gfxContext;

    function cameraSetup() {
        state.getScene().cameras.main.setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        state.getScene().cameras.main.setZoom(0.95); // remove?
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

    function createTextures() {
        // TODO: Fix proper textures....
        // let gfx = state.getScene().make.graphics({ x: 0, y: 0 }, false);
        const gfx = new Phaser.GameObjects.Graphics(state.getScene());
        gfx.fillStyle(0xffb300, 1.0);
        gfx.fillCircle(5, 5, 5);
        gfx.generateTexture('Bullet', 5, 5);
    }

    function init() {
        // After assets are loaded.
        UIScene = UI();
        state.getScene().scene.add(gameConfig.SCENES.UI, UIScene.getScene(), true);
        audioManager = AudioManager(UIScene.getScene());
        gfxContext = state.getScene().add.graphics();

        createTextures();
        createInput();

        enemyFactory.spawnWave(new Vector(1800, gameConfig.GAME.VIEWHEIGHT / 2), 75, 3, 'standard', {}); // Straight
        enemyFactory.spawnWave(new Vector(1800, 0), 75, 12, 'standard', {}, createSine); // sinewave
        enemyFactory.spawnWave(new Vector(1800, 100), 75, 12, 'standard', {}, createCosine); // cosinewave
        enemyFactory.spawnWave(new Vector(1800, 400), 75, 12, 'standard', {}, createSigmoid); // sigmoid "wave"
        enemyFactory.spawnWave(new Vector(1800, 400), 75, 12, 'standard', {}, createReverseSigmoid); // reverse/inverse sigmoid "wave"

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

        gameEntities.forEach((entity) => {
            entity.update(time);
        });

        if (UIScene.getGUIController().object.renderQTree) {
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
