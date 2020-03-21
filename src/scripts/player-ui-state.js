function watch() {
    const playerWrapper = document.getElementById("app-player-bottom");
    const pData = document.getElementById("p-data");

    pData.onclick = () => {
        const currentState = playerWrapper.getAttribute("state");
        const isCollapsed = currentState === "collapsed";
        const newState = isCollapsed ? "expanded" : "collapsed";

        playerWrapper.setAttribute("state", newState);
        playerWrapper.classList.remove(`p-viewport-${currentState}`);
        playerWrapper.classList.add(`p-viewport-${newState}`);

        this.player.changeButtonControls({
            playButton: "#play",
            nextButton: "#next",
            prevButton: "#prev",
            loopButton: "#loop",
            randomButton: "#random",
            timerDisplay: "#timer",
            // volRange: volSlider,
            durationRange: "#duration",
        });
    }
}

export default { watch };