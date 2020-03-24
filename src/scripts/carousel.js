import Hammer from "hammerjs";

import { categories } from "./data";

function scrollTo(top = 0, left = 0, node = window) {
    node.scroll({ top, left });
}


function getCategoryHTML(category) {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("s-category-item-container");

    const item = document.createElement("div");
    item.classList.add("s-category-item");
    item.textContent = category.name

    itemContainer.appendChild(item);

    return itemContainer;
}
function renderCategories(renderSongs, player) {
    const categoryWrapper = document.querySelector('.s-category-wrapper');
    const categoryContainer = document.querySelector('.s-category-container');

    function generateCategories() {
        categories.forEach(category => {
            const categoryHTML = getCategoryHTML(category);
            categoryContainer.appendChild(categoryHTML);

            const categoryHammer = new Hammer(categoryHTML);
            categoryHammer.on("tap", () => {
                renderSongs(category.getSongs(), category.name.toLowerCase());
            });
        });
    }
    generateCategories();

    const wrapperHammer = new Hammer(categoryWrapper);

    let maxScrollX = categoryWrapper.scrollWidth - categoryWrapper.clientWidth;

    let currentX = 0;

    wrapperHammer.on("panleft", ({ deltaX }) => {
        scrollTo(0, currentX + Math.abs(deltaX), categoryWrapper);
    });
    wrapperHammer.on("panright", ({ deltaX }) => {
        scrollTo(0, currentX - deltaX, categoryWrapper);
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