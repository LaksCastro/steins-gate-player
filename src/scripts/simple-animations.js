import { generateRandomColorPalette, generateRandomColor, randomIntFromInterval } from "../utils"

function simpleAnimations() {

    const animations = {
        cardAnimation: {

        }
    }


    animateCardsNotSelected();
    function animateCardsNotSelected() {

        const cards = document.querySelectorAll(".s-item-wrapper:not(.s-item-wrapper-selected)");

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
                clearAnimation();
            }

            let palette = generateRandomColorPalette();


            function changePalette() {
                if (!allowAnimate) return;

                paletteId = setTimeout(() => {
                    palette = generateRandomColorPalette();
                    changePalette();
                }, 3000);
            }

            function clearAnimation() {
                style.setProperty('--after-height', '5px');
                style.setProperty('--after-background', '#a1a1a1');

                style.setProperty('--before-height', '5px');
                style.setProperty('--before-background', '#a1a1a1');
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

    animateCardSelected();
    function animateCardSelected() {

        const cards = document.querySelectorAll(".s-item-wrapper-selected");

        Array.from({ length: cards.length }).forEach((_, i) => {

            const card = cards[i];

            const style = card.style;

            let allowAnimate = true;

            function animate() {
                if (!allowAnimate) return;

                setTimeout(() => {
                    style.setProperty('--after-height', `${randomIntFromInterval(0, 30)}px`);

                    style.setProperty('--before-height', `${randomIntFromInterval(0, 30)}px`);

                    animate();
                }, 100);
            }
            animate();
        });
    }
    return animations;
}

export default simpleAnimations;