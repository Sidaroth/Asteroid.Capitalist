import Phaser from 'phaser';

/**
 * Hook into phasers scene lifecycle.
 */
const isScene = function isSceneFunc(state, sceneKey) {
    if (!sceneKey) {
        throw new Error('Missing sceneKey');
    }
    const scene = new Phaser.Scene(sceneKey);
    const targetDelta = 1000 / 60;

    // 1
    scene.init = () => {
        if (state.init) state.init();
    };

    // 2
    scene.preload = () => {
        if (state.preload) state.preload();
    };

    // 3
    scene.create = () => {
        if (state.create) state.create();
    };

    // 4
    scene.update = (runTime, delta) => {
        const deltaScale = (delta / targetDelta);
        const time = { runTime, delta, deltaScale };
        if (state.update) state.update(time);
    };

    scene.destroy = () => {
        if (state.destroy) state.destroy();
    };

    function getScene() {
        return scene;
    }

    return {
        getScene,
    };
};

export default isScene;
