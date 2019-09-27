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
        qTree.remove(entity);
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
        let gfx = state.getScene().make.graphics({ x: 0, y: 0 }, false);
        gfxContext.fillStyle(0xffb300, 1.0);
        gfxContext.fillCircle(5, 5, 5);
        gfxContext.generateTexture('Bullet', 5, 5);

        gfx = state.getScene().make.graphics({ x: 0, y: 0 }, false);
        gfx.lineStyle(2, 0x00897b);
        gfx.fillStyle(0x00897b);
        gfx.beginPath();

        const shipWidth = 18;
        const shipHeight = 30;
        gfx.moveTo(shipWidth / 2, 0);
        gfx.lineTo(shipWidth, shipHeight);
        gfx.lineTo(0, shipHeight);

        gfx.closePath();
        gfx.fillPath();
        gfx.strokePath();
        gfx.generateTexture('Ship', shipWidth, shipHeight);
    }

    function init() {
        // After assets are loaded.
        UIScene = UI();
        state.getScene().scene.add(gameConfig.SCENES.UI, UIScene.getScene(), true);
        audioManager = AudioManager(UIScene.getScene());
        gfxContext = state.getScene().add.graphics();

        createTextures();
        createInput();

        const player = createPlayer();
        store.player = player;
        gameEntities.push(player);
        qTree.insert(player);
    }

    function create() {
        audioManager.playMusic();
        cameraSetup();
    }

    function getGfxContext() {
        return gfxContext;
    }

    function update(time) {
        // TODO: If there's not a lot of entities moving it's faster
        // to remove and reinsert only the dirty ones, instead of recreating the tree from scratch (.clear())
        qTree.clear();
        gfxContext.clear();
        gameEntities.forEach((entity) => {
            entity.update(time);
            qTree.insert(entity);
        });

        if (UIScene.getGUIController().object.renderQTree) {
            qTree.render(gfxContext);
        }
    }

    function destroy() {
        if (UIScene) UIScene.destroy();
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
        getGfxContext,
    };

    return createState('Game', state, {
        localState,
        canListen: canListen(state),
        isScene: isScene(state, gameConfig.SCENES.GAME),
    });
};

export default Game;
