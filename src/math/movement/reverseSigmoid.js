import gameConfig from 'configs/gameConfig';
import normalizeRange from '../normalizeRange';
import clamp from '../clamp';

const edgeOffset = 75;
const createReverseSigmoid = (pos) => {
    const val = normalizeRange(pos.x, 0, gameConfig.GAME.VIEWWIDTH, -10, 10);

    const sigmoid = 1 / (1 + Math.E ** val);
    const y = gameConfig.GAME.VIEWHEIGHT + gameConfig.GAME.VIEWHEIGHT * -sigmoid;

    return { x: pos.x, y: clamp(y, edgeOffset, gameConfig.GAME.VIEWHEIGHT - edgeOffset) };
};

export default createReverseSigmoid;
