import gameConfig from 'configs/gameConfig';

const createCosine = (pos) => {
    const frequency = 150;
    const amplitude = 250;
    const y = Math.cos(pos.x / frequency) * amplitude + gameConfig.GAME.VIEWHEIGHT / 2;

    return { x: pos.x, y };
};

export default createCosine;
