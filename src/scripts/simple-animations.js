import { generateRandomColorPalette, generateRandomColor, randomIntFromInterval } from "../utils"

function simpleAnimations() {
    const cards = document.getElementsByClassName("s-item-wrapper");
    Array.from({ length: cards.length }).forEach((_, i) => {
        const card = cards[i];

        const style = card.style;

        let animationId = null;
        let allowAnimate = false;

        card.onmouseenter = function () {
            allowAnimate = true;
            animate();
        }
        card.onmouseleave = function () {
            allowAnimate = false;
            clearTimeout(animationId);
        }

        function animate() {
            if (!allowAnimate) return;

            animationId = setTimeout(() => {
                style.setProperty('--after-height', `${randomIntFromInterval(0, 30)}px`);
                style.setProperty('--after-background', `${generateRandomColor().string}`);

                style.setProperty('--before-height', `${randomIntFromInterval(0, 30)}px`);
                style.setProperty('--before-background', `${generateRandomColor().string}`);

                animate();
            }, 100);
        }
    });
}

export default simpleAnimations;