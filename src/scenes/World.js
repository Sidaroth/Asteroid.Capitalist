import gameConfig from 'configs/gameConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';
import enemyFactory from 'entities/createLevelMaster';
import levels from 'configs/levels';
import createPlayer from 'entities/createPlayer';
import store from 'src/store';

/**
 * Layer/Scene for world elements.
 */

const World = function WorldFunc() {
    const state = {};
    let player;

    function create() {
        enemyFactory.readSpawnConfig(levels.level1);

        player = createPlayer();
        store.player = player;
        store.game.addEntity(player);
    }

    function update(time) {
        enemyFactory.update(time);
        return time;
    }

    function destroy() {
        store.game.removeEntity(player);
        player.destroy();
        player = undefined;
        enemyFactory.reset(levels.level1);
    }

    const localState = {
        // methods
        create,
        update,
        destroy,
    };

    return createState('WorldScene', state, {
        localState,
        isScene: isScene(state, gameConfig.SCENES.WORLD),
    });
};

export default World;
