import keyboard from "./keyboard"
import { moveNodeElementTo } from "../utils"

function watch() {

    const stateExpandedWrapper = document.querySelector(".state-expanded");
    const stateCollapsedWrapper = document.querySelector(".state-collapsed");

    const playerExpandedBackButton = document.getElementById("p-expanded-back-button");
    const playerExpandedToHomeButton = document.getElementById("p-expanded-to-home");
    const playerExpandedFavoriteButton = document.getElementById("p-expanded-favorite");
    const pData = document.getElementById("p-data");

    pData.onclick = expandPlayer.bind(this);

    playerExpandedToHomeButton.onclick = collapsePlayer.bind(this);
    playerExpandedBackButton.onclick = collapsePlayer.bind(this);

    let state = "collapsed";

    keyboard.on([{
        key: 38,
        callback: expandPlayer.bind(this)
    }, {
        key: 40,
        callback: collapsePlayer.bind(this)
    }]);

    function expandPlayer() {
        state = "expanded";
        changeState.apply(this, [{
            playButton: "#p-expanded-play",
            nextButton: "#p-expanded-next",
            prevButton: "#p-expanded-prev",
            loopButton: "#p-expanded-loop",
            randomButton: "#p-expanded-random",
            // volRange: volSlider,
            durationRange: "#p-expanded-duration",
        }]);

        moveNodeElementTo({
            newParentId: "p-expanded-wave-wrapper",
            currentParentId: "p-wave-wrapper",
            nodeToMove: this.wave.container
        });
        this.wave.reInit();
    }
    function collapsePlayer() {
        state = "collapsed";

        changeState.apply(this, [{
            playButton: "#p-play",
            nextButton: "#p-next",
            prevButton: "#p-prev",
            muteButton: "#p-toggle-mute",
            loopButton: "#p-loop",
            randomButton: "#p-random",
            // volRange: volSlider,
            durationRange: "#duration",
        }]);

        moveNodeElementTo({
            newParentId: "p-wave-wrapper",
            currentParentId: "p-expanded-wave-wrapper",
            nodeToMove: this.wave.container
        });
        this.wave.reInit();
    }

    function changeState(config) {
        const isCollapsed = state === "collapsed";
        const newState = isCollapsed ? "expanded" : "collapsed";

        const newStateIsCollapsed = state === "collapsed";

        state = newState;

        stateCollapsedWrapper.classList.add(newStateIsCollapsed ? "show" : "hide");
        stateCollapsedWrapper.classList.remove(newStateIsCollapsed ? "hide" : "show");

        stateExpandedWrapper.classList.add(!newStateIsCollapsed ? "show" : "hide");
        stateExpandedWrapper.classList.remove(!newStateIsCollapsed ? "hide" : "show");

        this.player.changeButtonControls(config);
    }

    // FAVORITE FEATURE

    playerExpandedFavoriteButton.onclick = toggleFavorite.bind(this);
    this.player.onAnyFavoriteChanged = ({ songs }) => {
        const favoriteSongs = songs.filter(song => song.favorite);
        this.storage.setFavorites(favoriteSongs);
    }
    function toggleFavorite() {
        const nowIsFavorite = this.player.toggleFavorite();
        playerExpandedFavoriteButton.textContent = nowIsFavorite ? "favorite" : "favorite_border";
    }
}

export default { watch };