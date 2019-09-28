import gameConfig from 'configs/gameConfig';

const mapRange = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

const createSigmoid = (pos) => {
    const val = mapRange(pos.x, 0, gameConfig.GAME.VIEWWIDTH, -10, 10);

    const sigmoid = 1 / (1 + Math.E ** val);
    const y = gameConfig.GAME.VIEWHEIGHT * sigmoid;

    return { x: pos.x, y };
};

export default createSigmoid;
