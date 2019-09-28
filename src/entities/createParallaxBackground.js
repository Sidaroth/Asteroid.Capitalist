import createState from 'utils/createState';
import canEmit from 'components/events/canEmit';
import canListen from 'components/events/canListen';
import hasPosition from 'components/hasPosition';
import Phaser from 'phaser';
import store from 'src/store';
import spriteConfig from 'configs/spriteConfig';
import gameConfig from 'configs/gameConfig';
import getRandomInt from 'src/math/getRandomInt';

const createParallaxBackground = () => {
    const state = {};
    const tileSize = 256;
    /**
     * @type {Array<Array<Phaser.GameObjects.Sprite>>}
     */
    const tiles = [];

    function __constructor() {
        const yCount = parseInt((gameConfig.GAME.VIEWHEIGHT / tileSize) + 1);
        const xCount = parseInt((gameConfig.GAME.VIEWWIDTH / tileSize) + 2);
        for (let i = 0; i < yCount; i += 1) {
            if (!tiles[i]) tiles[i] = [];
            for (let j = 0; j < xCount; j += 1) {
                const rot = getRandomInt(0, 3);
                const sprite = new Phaser.GameObjects.Sprite(store.game.getScene(), j * tileSize + tileSize / 2, i * tileSize + tileSize / 2, spriteConfig.BACKGROUND_TILE.KEY);
                sprite.setRotation(rot * ((2 * Math.PI) / 4));
                tiles[i].push(sprite);
                store.game.getScene().add.existing(sprite);
            }
        }
    }

    function update(time) {
        tiles.forEach((tileRow) => {
            tileRow.forEach((tile, index) => {
                if (tile.x < -(tileSize / 2)) {
                    const rightMostTile = tileRow.reduce((lastTile, t) => {
                        if (!lastTile) {
                            return t;
                        }
                        if (lastTile.x < t.x) {
                            return t;
                        }
                        return lastTile;
                    }, null);
                    tile.setPosition(rightMostTile.x + tileSize, tile.y);
                }
                tile.setPosition(tile.x - 1 * time.deltaScale, tile.y);
            });
        });
        return time;
    }

    const localState = {
        __constructor,
        update,
    };

    return createState('ParallaxBackground', state, {
        localState,
        canEmit: canEmit(state),
        canListen: canListen(state),
        hasPosition: hasPosition(state),
    });
};

export default createParallaxBackground;
