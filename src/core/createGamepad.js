import canEmit from 'components/events/canEmit';
import createState from 'utils/createState';
import store from 'src/store';
import gameConfig from 'configs/gameConfig';

const createGamepadState = (pad) => {
    const padState = {
        buttons: {},
        axes: {},
    };
    const MAPPING = gameConfig.GAMEPAD_MAPPING;

    Object.keys(MAPPING.BUTTONS).forEach((key) => {
        if (pad.buttons[MAPPING.BUTTONS[key]].pressed) padState.buttons[key] = true;
    });

    Object.keys(MAPPING.AXES).forEach((key) => {
        const axisValue = pad.axes[MAPPING.AXES[key]];
        padState.axes[key] = Math.abs(axisValue) > MAPPING.DEADZONE ? axisValue : 0;
    });

    return padState;
};

const createGamepadInput = () => {
    const state = {};
    const connected = [];

    function gamepadConnected(e) {
        connected.push(e.gamepad);
    }

    function gamepadDisconnected(e) {
        const idx = connected.indexOf(e.gamepad);
        connected.splice(idx, 1);
    }

    function getGamepadState() {
        const pad = [...navigator.getGamepads()].filter(p => p != null)[0]; // Filter out unused pads. Spread because getGamepads() returns a gamepadList type, which is useless...
        if (!pad) return undefined;

        const gamepadState = createGamepadState(pad);
        return gamepadState;
    }

    function enable() {
        window.addEventListener('gamepadconnected', gamepadConnected);
        window.addEventListener('gamepaddisconnected', gamepadDisconnected);

        store.gamepads = state;
    }

    function disable() {
        window.removeEventListener('gamepadconnected', gamepadConnected);
        window.removeEventListener('gamepaddisconnected', gamepadDisconnected);

        delete store.gamepads;
    }

    const localState = {
        // props
        // methods
        disable,
        enable,
        getGamepadState,
        connected,
    };

    return createState('gamepad', state, {
        localState,
        canEmit: canEmit(state),
    });
};

export default createGamepadInput;
