import Phaser from 'phaser';

const hasSprite = function hasSpriteFunc(state) {
    let sprite;
    let key;

    function __constructor() {}

    function createShipTexture(scene, gfx) {
        const shipWidth = 18;
        const shipHeight = 30;

        gfx.lineStyle(2, 0xff00ff);
        gfx.fillStyle(0xff00ff);
        gfx.beginPath();

        gfx.moveTo(shipWidth / 2, 0);
        gfx.lineTo(0, shipHeight);
        gfx.lineTo(shipWidth, shipHeight);

        gfx.closePath();
        gfx.fillPath();
        gfx.strokePath();
        gfx.generateTexture('Ship', 30, 30);

        sprite = new Phaser.GameObjects.Sprite(scene, state.getX(), state.getY(), 'Ship');
        scene.add.existing(sprite);
    }

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
        sprite.setTexture(texture);
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
        createShipTexture,
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
