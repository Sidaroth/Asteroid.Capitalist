import store from 'root/store';
import eventConfig from 'configs/eventConfig';

const hasInput = function hasInputFunc(state) {
    const { keyboard, gamepads } = store;

    function onKeyDown(e) {
        state.emit(eventConfig.KEY.DOWN, e);
    }

    function onKeyUp(e) {
        state.emit(eventConfig.KEY.UP, e);
    }

    function isBoundKeyDown(...bindings) {
        const kbInput = bindings.some(binding => keyboard.isKeyDown(binding));
        if (kbInput) return kbInput;

        return kbInput;
    }

    function getGamepadAxesData() {
        const pad = gamepads.getGamepadState();
        return pad ? pad.axes : undefined;
    }

    function __constructor() {
        state.listenOn(keyboard, eventConfig.KEY.UP, onKeyUp);
        state.listenOn(keyboard, eventConfig.KEY.DOWN, onKeyDown);
    }

    function getKeyboard() {
        return keyboard;
    }

    return {
        __constructor,
        getKeyboard,
        isBoundKeyDown,
        getGamepadAxesData,
    };
};

export default hasInput;
