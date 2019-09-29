import createState from 'utils/createState';

const createShield = () => {
    const state = {};

    function __constructor() {}

    const localState = {
        __constructor,
    };

    return createState('string', state, {
        localState,
    });
};

export default createShield;
