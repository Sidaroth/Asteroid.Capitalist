import createState from 'utils/createState';
import hasSprite from 'components/entities/hasSprite';
import spriteConfig from 'configs/spriteConfig';
import store from 'src/store';
import hasPosition from 'components/hasPosition';
import getRandomInt from 'src/math/getRandomInt';

const createMeteor = (startPosition, direction, inBG = true) => {
    const state = {};
    const inBackground = inBG;
    const speed = getRandomInt(1, 3);
    const velocity = direction.clone().setLength(speed);
    let rotation = 0;
    const rotationSpeed = Math.random();

    function __constructor() {
        const spriteKey = spriteConfig.METEORPACK.SPRITEKEYS[getRandomInt(0, spriteConfig.METEORPACK.SPRITEKEYS.length - 1)];
        state.createSpriteFromAtlas(store.backgroundScene.getScene(), spriteConfig.METEORPACK.KEY, spriteKey);
        if (inBackground) {
            state.setPipeline('Blur');
        }
        state.setPosition(startPosition);
    }

    function update(time) {
        const position = state.getPosition();
        position.x += velocity.x * time.deltaScale;
        position.y += velocity.y * time.deltaScale;
        state.setPosition(position);
        rotation += ((Math.PI * 2) / 360) * rotationSpeed;
        state.setRotation(rotation);

        if (position.x < -300) {
            state.destroy();
        }

        return time;
    }

    const localState = {
        __constructor,
        update,
    };

    return createState('Meteor', state, {
        localState,
        hasSprite: hasSprite(state),
        hasPosition: hasPosition(state),
    });
};

export default createMeteor;
