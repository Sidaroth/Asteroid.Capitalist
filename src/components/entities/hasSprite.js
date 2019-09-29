import Phaser from 'phaser';

const hasSprite = function hasSpriteFunc(state) {
    let sprite;
    let key;

    function __constructor() {}

    function createSpriteFromKey(scene, tileKey) {
        key = tileKey;

        if (sprite) {
            sprite.destroy();
        }

        state.setKey(tileKey);
        sprite = new Phaser.GameObjects.Sprite(scene, state.getX(), state.getY(), tileKey);
        sprite.setOrigin(0.5);
        scene.add.existing(sprite);

        return sprite;
    }

    function createSpriteFromAtlas(scene, atlasKey, tileKey) {
        key = tileKey;

        if (sprite) {
            sprite.destroy();
        }

        state.setKey(tileKey);
        sprite = new Phaser.GameObjects.Sprite(scene, state.getX(), state.getY(), atlasKey, tileKey);
        sprite.setOrigin(0.5);
        scene.add.existing(sprite);

        return sprite;
    }

    function getSprite() {
        return sprite;
    }

    function setPipeline(pipeline) {
        sprite.setPipeline(pipeline);
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
        sprite.setTexture(texture);
    }

    function setPosition(pos) {
        if (sprite && (sprite.x !== pos.x || sprite.y !== pos.y)) {
            sprite.x = pos.x;
            sprite.y = pos.y;
        }

        return pos;
    }

    function setRotation(radians) {
        if (sprite) {
            sprite.rotation = radians;
        }
    }

    function destroy() {
        sprite.destroy();
    }

    return {
        __constructor,
        createSpriteFromKey,
        createSpriteFromAtlas,
        setPipeline,
        setRotation,
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
