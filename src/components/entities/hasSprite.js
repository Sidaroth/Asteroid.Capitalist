import Phaser from 'phaser';
import spriteConfig from 'configs/spriteConfig';

const hasSprite = function hasSpriteFunc(state) {
    let sprite;
    let key;

    function __constructor() {}

    function createSpriteFromKey(tileKey) {
        key = tileKey;

        if (sprite) {
            sprite.destroy();
        }

        state.setKey(tileKey);
        sprite = new Phaser.GameObjects.Sprite(state.getParentScene(), state.getPosition().x, state.getPosition().y, tileKey);

        return sprite;
    }

    function getSprite() {
        return sprite;
    }

    function getKey() {
        return key;
    }

    function setScale(sx, sy = sx) {
        sprite.setScale(sx, sy);
    }

    function setFlipX(value) {
        sprite.setFlipX(value);
    }

    function setKey(keyPrime) {
        key = keyPrime;
    }

    function setTexture(texture) {
        sprite.setTexture(spriteConfig.DIGGERPACK.KEY, texture);
    }

    function setPosition(pos) {
        if (sprite && (sprite.x !== pos.x || sprite.y !== pos.y)) {
            sprite.x = pos.x;
            sprite.y = pos.y;
        }

        return pos;
    }

    function destroy() {
        sprite.destroy();
    }

    return {
        __constructor,
        createSpriteFromShape,
        createSpriteFromKey,
        getKey,
        setKey,
        setFlipX,
        getSprite,
        setTexture,
        setPosition,
        setScale,
        destroy,
    };
};

export default hasSprite;
