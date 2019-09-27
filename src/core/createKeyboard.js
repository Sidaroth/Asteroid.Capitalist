import canEmit from 'components/events/canEmit';
import eventConfig from 'configs/eventConfig';
import createState from 'utils/createState';

const createKeyboardInput = function createKeyboardInputFunc() {
    const state = {};
    const keyMap = new Map();

    function keyDownFn(e) {
        keyMap.set(e.keyCode, { repeat: e.repeat, down: true });
        state.emit(eventConfig.KEY.DOWN, { key: e.key, repeat: e.repeat, keyCode: e.keyCode });
    }

    function keyUpFn(e) {
        keyMap.set(e.keyCode, { repeat: false, down: false });
        state.emit(eventConfig.KEY.UP, { key: e.key, repeat: e.repeat, keyCode: e.keyCode });
    }

    function isKeyDown(keyCode) {
        return keyMap.get(keyCode) && keyMap.get(keyCode).down;
    }

    function enable() {
        document.addEventListener('keydown', keyDownFn);
        document.addEventListener('keyup', keyUpFn);
    }

    function disable() {
        document.removeEventListener('keydown', keyDownFn);
        document.removeEventListener('keyup', keyUpFn);
    }

    const localState = {
        // props
        // methods
        disable,
        enable,
        isKeyDown,
    };

    return createState('keyboard', state, {
        localState,
        canEmit: canEmit(state),
    });
};

export default createKeyboardInput;
