import Hammer from "hammerjs";

function scrollTo(top = 0, left = 0, node = window) {
    node.scroll({ top, left });
}


function renderCategories() {
    const categoryWrapper = document.querySelector('.s-category-wrapper');

    const wrapperHammer = new Hammer(categoryWrapper);

    let maxScrollX = categoryWrapper.scrollWidth - categoryWrapper.clientWidth;

    let currentX = 0;

    wrapperHammer.on("panleft", e => {
        console.log({
            distance: e.distance
        });
        console.log(e);
        scrollTo(0, currentX + (e.deltaX * -1), categoryWrapper);

    });
    wrapperHammer.on("panright", e => {
        console.log({
            distance: e.distance
        });
        console.log(e);
        scrollTo(0, currentX - (e.deltaX), categoryWrapper);

    });
    wrapperHammer.on("panend", e => {
        if (e.additionalEvent === "panleft") {
            currentX = currentX + Math.abs(e.deltaX);
            if (currentX >= maxScrollX) currentX = maxScrollX;
        }
        else {
            currentX = currentX - Math.abs(e.deltaX);
            if (currentX <= 0) currentX = 0;
        }
    });



}

export {
    renderCategories
};