import { generateRandomColorPalette, generateRandomColor, randomIntFromInterval } from "../utils"

function simpleAnimations() {
    const cards = document.getElementsByClassName("s-item-wrapper");
    Array.from({ length: cards.length }).forEach((_, i) => {
        const card = cards[i];

        const style = card.style;

        let animationId = null;
        let paletteId = null;
        let allowAnimate = false;

        card.onmouseenter = function () {
            allowAnimate = true;
            changePalette();
            animate();
        }
        card.onmouseleave = function () {
            allowAnimate = false;
            clearTimeout(animationId);
            clearTimeout(paletteId);
        }

        let palette = generateRandomColorPalette();


        function changePalette() {
            if (!allowAnimate) return;

            paletteId = setTimeout(() => {
                palette = generateRandomColorPalette();
                changePalette();
            }, 6000);
        }

        function animate() {
            if (!allowAnimate) return;

            animationId = setTimeout(() => {
                style.setProperty('--after-height', `${randomIntFromInterval(0, 30)}px`);
                style.setProperty('--after-background', `${generateRandomColor(palette).string}`);

                style.setProperty('--before-height', `${randomIntFromInterval(0, 30)}px`);
                style.setProperty('--before-background', `${generateRandomColor(palette).string}`);

                animate();
            }, 100);
        }
    });
}

export default simpleAnimations;