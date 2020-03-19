// import { hello, tes } from './scripts/import-example';

import './styles/style.css';
import './styles/style.scss';
import './styles/style.sass';

import data from "./scripts/data"
import MusicPlayer from "./scripts/player"

let songs = data.map(item => {
  const src = require(`./assets/audios/${item.filename}`).default;
  const coverSrc = require(`./assets/images/${item.cover}`).default;
  return {
    ...item,
    src,
    coverSrc
  }
})

const player = MusicPlayer({
  playButton: "#play",
  nextButton: "#next",
  prevButton: "#prev",
  muteButton: "#toggle-mute",
  timerDisplay: "#timer",
  songs,
  initOn: 0
});
player.init();