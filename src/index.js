import './styles/style.scss';

import MusicPlayer from "./scripts/player"
import keyboard from "./scripts/shortcuts"
import songs from "./scripts/data"

document.addEventListener('DOMContentLoaded', init);

function init() {
  const player = MusicPlayer({
    playButton: "#play",
    nextButton: "#next",
    prevButton: "#prev",
    muteButton: "#toggle-mute",
    loopButton: "#loop",
    randomButton: "#random",
    timerDisplay: "#timer",
    volRange: "#vol",
    durationRange: "#duration",
    songs,
  });

  player.onSongChange = (updatedPlayer) => {
    console.log(updatedPlayer);
    document.querySelector("#content").innerHTML = `
    <h1>${updatedPlayer.songs[updatedPlayer.currentSong].name}</h1>
    <p>${updatedPlayer.currentSong}</p>
    <img width="450" src="${updatedPlayer.songs[updatedPlayer.currentSong].coverSrc}" alt="${updatedPlayer.songs[updatedPlayer.currentSong].name}" />
    `
  }
  player.init();

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