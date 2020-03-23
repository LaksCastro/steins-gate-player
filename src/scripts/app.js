import data, { playlists } from "./data";
import { firstLetterUppercase } from "../utils"
import { renderCategories } from "./carousel";

import simpleAnimations from "./simple-animations"

function getCardHTML(data, isSelected) {
    const { coverSrc: src, name, category } = data;

    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("s-item-wrapper");
    if (isSelected) cardWrapper.classList.add("s-item-wrapper-selected");

    const itemSpan = document.createElement("div");
    itemSpan.classList.add("s-item-span");

    cardWrapper.appendChild(itemSpan);

    const itemCoverWrapper = document.createElement("div");
    itemCoverWrapper.classList.add("s-item-cover-wrapper");

    const itemCover = document.createElement("img");
    itemCover.classList.add("s-item-cover");
    itemCover.src = src;
    itemCover.alt = name;

    itemCoverWrapper.appendChild(itemCover);

    cardWrapper.appendChild(itemCoverWrapper);

    const itemData = document.createElement("div");
    itemData.classList.add("s-item-data");

    const itemTitle = document.createElement("h3");
    itemTitle.classList.add("s-item-title");
    itemTitle.textContent = name;

    const itemDescription = document.createElement("p");
    itemDescription.classList.add("s-item-description");
    itemDescription.textContent = firstLetterUppercase(category);

    itemData.appendChild(itemTitle);
    itemData.appendChild(itemDescription);

    cardWrapper.appendChild(itemData);

    const itemPlayButton = document.createElement("button");
    itemPlayButton.classList.add("s-item-button-play");
    itemPlayButton.classList.add("mdc-icon-button");
    itemPlayButton.classList.add("material-icons");
    itemPlayButton.textContent = isSelected ? "pause" : "play_arrow";

    cardWrapper.appendChild(itemPlayButton);
    return cardWrapper;
}


function init() {
    let currentSong = null;

    const songsWrapper = document.querySelector(".song-list-wrapper");

    renderCategories();

    this.player.on(this.player.events.SONG_CHANGE, updatedPlayer => {
        clearSongs();
        currentSong = updatedPlayer.songs[updatedPlayer.currentSong];
        renderSongs(data);
        simpleAnimations.call(this);
    });
    this.player.on(this.player.events.INIT, updatedPlayer => {
        currentSong = updatedPlayer.songs[updatedPlayer.currentSong];
        renderSongs(data);
        simpleAnimations.call(this);
    });

    function clearSongs() {
        songsWrapper.innerHTML = "";
    }
    function renderSongs(songs) {
        songs.forEach(song => {
            const isSelected = song.filename === currentSong.filename;

            const card = getCardHTML(song, isSelected);

            songsWrapper.appendChild(card);
        });
    }
}

export default {
    init
}