import createState from 'utils/createState';
import canEmit from 'components/events/canEmit';
import isGameEntity from 'components/entities/isGameEntity';

const createBullet = () => {
    const state = {};

    const localState = {};

    return createState('Bullet', state, {
        localState,
        isGameEntity: isGameEntity(state),
        canEmit: canEmit(state),
    });
};

export default createBullet;
