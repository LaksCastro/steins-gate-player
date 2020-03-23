import data, { playlists } from "./data";
import { renderCategories } from "./carousel";

import simpleAnimations from "./simple-animations"

const selectedCardTemplate = `
    <div class="s-item-wrapper">
    <div class="s-item-span"></div>
    <div class="s-item-wave-wrapper"></div>
    <div class="s-item-cover-wrapper">
    <img src="/assets/hacking-to-the-gate.jpg" alt="Imagem teste" class="s-item-cover">
    </div>
    <div class="s-item-data">
    <h3 class="s-item-title">Hacking To The Gate</h3>
    <p class="s-item-description">Opening</p>
    </div>
    <button notransparent class="s-item-button-play mdc-icon-button material-icons">play_arrow</button>
    </div>
`
const notSelectedCardTemplate = `
    <div class="s-item-wrapper s-item-wrapper-selected">
    <div class="s-item-span"></div>
    <div class="s-item-wave-wrapper"></div>
    <div class="s-item-cover-wrapper">
        <img src="/assets/fatima.jpg" alt="Imagem teste" class="s-item-cover">
    </div>
    <div class="s-item-data">
        <h3 class="s-item-title">Hacking To The Gate</h3>
        <p class="s-item-description">Opening</p>
    </div>
    <button notransparent class="s-item-button-play mdc-icon-button material-icons">pause</button>
    </div>
`

function init() {
    let currentSong = null;

    renderCategories();

    this.player.on(this.player.events.SONG_CHANGE, updatedPlayer => {
        currentSong = updatedPlayer.songs[updatedPlayer.currentSong];
        console.log(currentSong);
    });
    this.player.on(this.player.events.INIT, updatedPlayer => {
        currentSong = updatedPlayer.songs[updatedPlayer.currentSong];
        console.log(currentSong);
    });

    function renderSongs(songs) {

    }
    renderSongs.apply(this, [data]);

    simpleAnimations.call(this);
}

export default {
    init
}