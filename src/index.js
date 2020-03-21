import './styles/style.scss';

import playerUIState from "./scripts/player-ui-state"

import { MDCSlider } from '@material/slider';

import { firstLetterUppercase } from "./utils"


import MusicPlayer from "./scripts/player"
import PlayerWave from "./scripts/wave-effect"

import keyboard from "./scripts/keyboard"
import songs from "./scripts/data"

document.addEventListener('DOMContentLoaded', init);


function init() {
  const wave = initWaveEffect.call(this);
  this.wave = wave;

  const player = initPlayer.call(this);
  this.player = player;

  initPlayerKeyboardShortcuts(player);

  playerUIState.watch.call(this);
}

function initWaveEffect() {
  const wave = PlayerWave();

  wave.render();
  wave.useStatic();

  return wave;
}

function initPlayer() {

  // const volSlider = new MDCSlider(document.querySelector('.mdc-slider'));

  const pThumb = document.getElementById("p-thumb");
  const pPlay = document.getElementById("p-play");
  const pLoop = document.getElementById("p-loop");
  const pRandom = document.getElementById("p-random");
  const pTitle = document.getElementById("p-title");
  const pDescription = document.getElementById("p-description");

  const player = MusicPlayer({
    playButton: "#p-play",
    nextButton: "#p-next",
    prevButton: "#p-prev",
    muteButton: "#p-toggle-mute",
    loopButton: "#p-loop",
    randomButton: "#p-random",
    timerDisplay: "#timer",
    // volRange: volSlider,
    durationRange: "#duration",
    songs,
  });

  function renderSong(updatedPlayer) {
    const song = updatedPlayer.songs[updatedPlayer.currentSong];
    pThumb.src = song.coverSrc;
    pThumb.alt = song.name;
    pTitle.textContent = song.name;
    pDescription.textContent = firstLetterUppercase(song.category);
    pPlay.textContent = updatedPlayer.audio.paused ? "play_arrow" : "pause";

    this.wave.useStatic();
  }

  player.onInit = renderSong.bind(this);
  player.onSongChanged = renderSong.bind(this)

  player.onPlayStateChanged = (updatedPlayer) => {
    const isPaused = updatedPlayer.audio.paused;

    pPlay.textContent = isPaused ? "play_arrow" : "pause";
    isPaused ? this.wave.usePaused() : this.wave.usePlaying();
  }
  player.onAnyModeChanged = (updatedPlayer) => {
    pLoop.textContent = updatedPlayer.loopMode ? "repeat_one" : "repeat"
    pRandom.textContent = updatedPlayer.randomMode ? "shuffle" : "call_made"
  }
  player.init();

  return player;
}


function initPlayerKeyboardShortcuts(player) {
  keyboard.on([{
    key: 32,
    callback: player.togglePlaying.bind(player)
  }, {
    key: 39,
    callback: player.next.bind(player)
  }, {
    key: 37,
    callback: player.prev.bind(player)
  }, {
    key: 77,
    callback: player.toggleMute.bind(player)
  }, {
    key: 82,
    callback: player.toggleRandomMode.bind(player)
  }, {
    key: 76,
    callback: player.toggleLoopMode.bind(player)
  }]);
}