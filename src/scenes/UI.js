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
        const folder = gui.addFolder('Dev Settings');

        state.guiData = {
            renderQTree: false,
            accelerationForceMag: 1.5,
            maxSpeed: 75,
            rateOfFire: 5,
            playerAirDensity: 0.05,
        };

        guiController = folder.add(state.guiData, 'renderQTree').listen();

        folder
            .add(state.guiData, 'accelerationForceMag', 0, 20)
            .listen()
            .onChange(v => store.player.setAccelerationForceMagnitude(v));

        folder
            .add(state.guiData, 'maxSpeed', 1, 25)
            .listen()
            .onChange(v => store.player.setMaxSpeed(v));

        folder
            .add(state.guiData, 'rateOfFire', 1, 100)
            .listen()
            .onChange(v => store.player.setRateOfFire(v));

        folder
            .add(state.guiData, 'playerAirDensity', 0.001, 0.5)
            .listen()
            .onChange(v => store.player.setAirDensity(v));

        folder.close();
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
