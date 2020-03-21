import { moveNodeElementTo } from "../utils"

function watch() {
    const playerWrapper = document.getElementById("app-player-bottom");
    const playerExpandedBackButton = document.getElementById("p-expanded-back-button");
    const pData = document.getElementById("p-data");

    pData.onclick = () => {
        changeState.apply(this, [{
            playButton: "#play",
            nextButton: "#next",
            prevButton: "#prev",
            loopButton: "#loop",
            randomButton: "#random",
            timerDisplay: "#timer",
            // volRange: volSlider,
            durationRange: "#duration",
        }]);

        moveNodeElementTo({
            newParentId: "p-expanded-wave-wrapper",
            currentParentId: "p-wave-wrapper",
            nodeToMove: this.wave.container
        });
        this.wave.reInit();

    }
    playerExpandedBackButton.onclick = () => {
        changeState.apply(this, [{
            playButton: "#p-play",
            nextButton: "#p-next",
            prevButton: "#p-prev",
            muteButton: "#p-toggle-mute",
            loopButton: "#p-loop",
            randomButton: "#p-random",
            timerDisplay: "#timer",
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