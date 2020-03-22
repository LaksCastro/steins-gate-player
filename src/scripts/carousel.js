import EmblaCarousel from 'embla-carousel'

function renderTabs(tabs) {
    const tabWrapper = document.getElementById('tab-wrapper');
    const tabContainer = document.getElementById('tab-container');

    const options = { containScroll: true, dragFree: true }

    tabs.forEach(tab => {
        const tabNode = document.createElement("div");
        tabNode.classList.add("tab");
        tabNode.textContent = tab.name;
        tabContainer.appendChild(tabNode);
    });

    const tabCarousel = EmblaCarousel(tabWrapper, options);
    return tabCarousel;
}
function renderCategories() {
    const categoryWrapper = document.querySelector('.s-category-wrapper');
    // const categoryContainer = document.querySelector('.tab-container');

    const options = { containScroll: true, dragFree: true }

    const tabCarousel = EmblaCarousel(categoryWrapper, options);
    return tabCarousel;
}

export {
    renderTabs,
    renderCategories
};