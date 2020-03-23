import { renderCategories } from "./carousel";

import simpleAnimations from "./simple-animations"

function init() {
    renderCategories();
    this.player.on(this.player.events.SONG_CHANGE, updatedPlayer => {
        console.log("alo do segundo listener");
        console.log(updatedPlayer);
    });
    simpleAnimations.call(this);
}

export default {
    init
}