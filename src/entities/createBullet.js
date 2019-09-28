import createState from 'utils/createState';
import canEmit from 'components/events/canEmit';
import isGameEntity from 'components/entities/isGameEntity';
import hasSprite from 'components/entities/hasSprite';
import hasPosition from 'components/hasPosition';
import store from 'root/store';

const createBullet = (pos, direction) => {
    const state = {};
    const speed = 15;
    const velocity = direction.clone().setLength(speed);
    const lifeTime = 3; // in Seconds.

    let creationTime;

    function createSprite() {
        state.createSpriteFromKey(store.game.getScene(), 'Bullet');
    }

    function update(time) {
        const position = state.getPosition();
        position.x += velocity.x * time.deltaScale;
        position.y += velocity.y * time.deltaScale;
        state.setPosition(position);

        if (Date.now() - creationTime > lifeTime * 1000) {
            // TODO: Set inactive and reuseable in some bullet pool instead.
            state.destroy();
        }
        return time;
    }

    function __constructor() {
        creationTime = Date.now();
        state.setPosition(pos);
        createSprite();
        store.game.addEntity(state);
    }

    function destroy() {
        store.game.removeEntity(state);
    }

    const localState = {
        __constructor,
        update,
        destroy,
    };

    return createState('Bullet', state, {
        localState,
        isGameEntity: isGameEntity(state),
        canEmit: canEmit(state),
        hasPosition: hasPosition(state),
        hasSprite: hasSprite(state),
    });
};

export default createBullet;
