import Stats from 'stats-js';
import * as dat from 'dat.gui';
import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import store from 'root/store';

/**
 * Layer/Scene for UI elements.
 */

const UI = function UIFunc() {
    const state = {};
    let gui;
    let stats;
    let guiController;

    function setupPerformanceStats() {
        stats = new Stats();
        stats.setMode(0);

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.body.appendChild(stats.domElement);

        // TODO cleanup listeners
        state.getScene().events.on('preupdate', () => {
            stats.begin();
        });
        state.getScene().events.on('postupdate', () => {
            stats.end();
        });
    }

    function setupDatGui() {
        gui = new dat.GUI();
        gui.addFolder('Dev Settings');

        state.guiData = {
            renderQTree: false,
            accelerationForceMag: 5,
            maxSpeed: 10,
            rateOfFire: 15,
        };

        guiController = gui.add(state.guiData, 'renderQTree').listen();

        gui.add(state.guiData, 'accelerationForceMag', 0, 20)
            .listen()
            .onChange(v => store.player.setAccelerationForceMag(v));

        gui.add(state.guiData, 'maxSpeed', 1, 25)
            .listen()
            .onChange(v => store.player.setMaxSpeed(v));

        gui.add(state.guiData, 'rateOfFire', 1, 100)
            .listen()
            .onChange(v => store.player.setRateOfFire(v));
    }

    function getGUIController() {
        return guiController;
    }

    function create() {
        setupDatGui();
        // setupPerformanceStats();
    }

    function destroy() {
        gui.destroy();
        stats.end();
        document.body.removeChild(stats);
    }

    const localState = {
        // methods
        create,
        destroy,
        getGUIController,
    };

    return createState('UIScene', state, {
        localState,
        isScene: isScene(state, gameConfig.SCENES.UI),
    });
};

export default UI;
