import { moveNodeElementTo } from "../utils"

function watch() {
    const playerWrapper = document.getElementById("app-player-bottom");

    const playerExpandedBackButton = document.getElementById("p-expanded-back-button");
    const playerExpandedToHomeButton = document.getElementById("p-expanded-to-home");
    const pData = document.getElementById("p-data");

    pData.onclick = expandPlayer.bind(this);

    playerExpandedToHomeButton.onclick = collapsePlayer.bind(this);
    playerExpandedBackButton.onclick = collapsePlayer.bind(this);

    function expandPlayer() {
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
        const currentState = playerWrapper.getAttribute("state");
        const isCollapsed = currentState === "collapsed";
        const newState = isCollapsed ? "expanded" : "collapsed";

        playerWrapper.setAttribute("state", newState);
        playerWrapper.classList.remove(`p-viewport-${currentState}`);
        playerWrapper.classList.add(`p-viewport-${newState}`);

        this.player.changeButtonControls(config);
    }
}

export default { watch };