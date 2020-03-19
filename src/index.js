import './styles/style.scss';

import MusicPlayer from "./scripts/player"
import songs from "./scripts/data"

const player = MusicPlayer({
  playButton: "#play",
  nextButton: "#next",
  prevButton: "#prev",
  muteButton: "#toggle-mute",
  loopButton: "#loop",
  randomButton: "#random",
  timerDisplay: "#timer",
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