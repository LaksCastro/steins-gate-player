// import { hello, tes } from './scripts/import-example';

import './styles/style.css';
import './styles/style.scss';
import './styles/style.sass';

import songs from "./scripts/data"
import MusicPlayer from "./scripts/player"

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