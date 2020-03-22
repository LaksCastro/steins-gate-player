import EmblaCarousel from 'embla-carousel'

function init() {
    const emblaNode = document.getElementById('tabs');
    const options = { containScroll: true, dragFree: true }
    const embla = EmblaCarousel(emblaNode, options);
    return embla;
}

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

export {
    renderTabs
};