import canEmit from 'components/events/canEmit';
import createState from 'utils/createState';
import store from 'src/store';
import eventConfig from 'configs/eventConfig';

const createMouseInput = function createMouseInputFunc() {
    const state = {};
    let mouseRelevantScene;
    let phaserPointer;

    function onMouseMove(pointer) {
        state.phaserPointer = pointer;
        state.emitGlobal(eventConfig.MOUSE.MOVE, pointer);
    }

    function onMouseDown(pointer) {
        state.phaserPointer = pointer;
        state.emitGlobal(eventConfig.MOUSE.DOWN, pointer);
    }

    function enable(scene) {
        mouseRelevantScene = scene;
        mouseRelevantScene.input.on('pointermove', onMouseMove);
        mouseRelevantScene.input.on('pointerdown', onMouseDown);
        store.mouse = state;
    }

    function disable() {
        mouseRelevantScene.input.off('pointermove', onMouseMove);
        mouseRelevantScene.input.off('pointerdown', onMouseDown);
        delete store.mouse;
    }

    const localState = {
        // props
        // methods
        enable,
        disable,
        phaserPointer,
    };

    return createState('mouse', state, {
        localState,
        canEmit: canEmit(state),
    });
};

export default createMouseInput;
