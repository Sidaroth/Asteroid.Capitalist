import store from 'root/store';
import eventConfig from 'configs/eventConfig';

const hasInput = function hasInputFunc(state) {
    const { keyboard, gamepads, mouse } = store;

    function onKeyDown(e) {
        state.emit(eventConfig.KEY.DOWN, e);
    }

    function onKeyUp(e) {
        state.emit(eventConfig.KEY.UP, e);
    }

    function onMouseMove(e) {
        state.emit(eventConfig.MOUSE.MOVE, e);
    }

    function isBoundKeyDown(...bindings) {
        const kbInput = bindings.some(binding => keyboard.isKeyDown(binding));
        if (kbInput) return kbInput;

        return kbInput;
    }

    // When we only care about moved axes.
    function getGamepadAxesData() {
        const pad = gamepads.getGamepadState();
        return pad ? pad.axes : undefined;
    }

    // When we only care about pressed buttons.
    function getGamePadButtonData() {
        const pad = gamepads.getGamepadState();
        return pad ? pad.buttons : undefined;
    }

    function getGamePadState() {
        return gamepads.getGamePadState();
    }

    function __constructor() {
        state.listenOn(keyboard, eventConfig.KEY.UP, onKeyUp);
        state.listenOn(keyboard, eventConfig.KEY.DOWN, onKeyDown);
        state.listenOn(mouse, eventConfig.MOUSE.MOVE, onMouseMove);
    }

    function getKeyboard() {
        return keyboard;
    }

    return {
        __constructor,
        getKeyboard,
        isBoundKeyDown,
        getGamepadAxesData,
        getGamePadButtonData,
        getGamePadState,
    };
};

export default hasInput;
