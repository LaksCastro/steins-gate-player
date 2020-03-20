function watch() {
    const playerWrapper = document.getElementById("app-player-bottom");
    const pData = document.getElementById("p-data");

    pData.onclick = (function () {
        const currentState = this.getAttribute("state");
        const isCollapsed = currentState === "collapsed";
        const newState = isCollapsed ? "expanded" : "collapsed";

        this.setAttribute("state", newState);
        this.classList.remove(`p-viewport-${currentState}`);
        this.classList.add(`p-viewport-${newState}`);
    }).bind(playerWrapper);
}

export default { watch };