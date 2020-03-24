import Hammer from "hammerjs";

function renderCategories() {
    const categoryWrapper = document.querySelector('.s-category-wrapper');

    const wrapperHammer = new Hammer(categoryWrapper);

    let position = {
        x: null,
        y: null
    }

    wrapperHammer.on("panleft", e => {
        console.log({
            distance: e.distance,
            event: e.eventType
        });
    });
}

export {
    renderCategories
};