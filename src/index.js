import 'styles/main.scss';
import Phaser from 'phaser';
import gameConfig from 'configs/gameConfig';
import devConfig from 'configs/devConfig';

import BootScene from 'scenes/Boot';
import LoadScene from 'scenes/Load';
import Game from 'scenes/Game';
import resizeCanvas from 'utils/resizeCanvas';
import store from './store';
import createMessageBus from 'core/createMessageBus';

const game = Game();
const phaserConfig = {
    type: Phaser.WEBGL,
    width: gameConfig.GAME.VIEWWIDTH,
    height: gameConfig.GAME.VIEWHEIGHT,
    backgroundColor: '#000000',
    parent: 'game',
    scene: [BootScene().getScene(), LoadScene().getScene(), game.getScene()],
};

document.getElementById('game').style.cursor = 'crosshair';

const app = new Phaser.Game(phaserConfig);
store.game = game;
store.app = app;
store.messageBus = createMessageBus();

window.addEventListener('resize', resizeCanvas);
window.addEventListener("gamepadconnected", function (e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);

    console.log(e.gamepad);
});

if (devConfig.DEBUG) console.warn('Game is running in DEBUG mode.');

const targetDelta = 1000 / 60;
let times = [];
function loop() {
    requestAnimationFrame(loop);
    times.push(performance.now());
    times = times.filter(t => performance.now() - 1000 < t);
    const delta = 1000 / times.length;
    const deltaScale = delta / targetDelta;
    const time = { delta, deltaScale };
    if (game.hasRunUpdateFromPhaser) {
        game.update(time);
    }
}

requestAnimationFrame(loop);
