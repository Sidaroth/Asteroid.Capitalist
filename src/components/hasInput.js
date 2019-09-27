import store from 'root/store';
import eventConfig from 'configs/eventConfig';

const hasInput = function hasInputFunc(state) {
    const { keyboard } = store;

    function onKeyDown(e) {
        state.emit(eventConfig.KEY.DOWN, e);
    }

    function onKeyUp(e) {
        state.emit(eventConfig.KEY.UP, e);
    }

    function isInputDown(...bindings) {
        return bindings.some(binding => keyboard.isKeyDown(binding));
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
        isInputDown,
    };
};

export default hasInput;
