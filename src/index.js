import 'styles/main.scss';
import Phaser from 'phaser';
import gameConfig from 'configs/gameConfig';

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

const app = new Phaser.Game(phaserConfig);
store.game = game;
store.app = app;
store.messageBus = createMessageBus();

window.addEventListener('resize', resizeCanvas);
