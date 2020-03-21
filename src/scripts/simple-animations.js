import { generateRandomColorPalette, generateRandomColor } from "../utils"

function simpleAnimations() {
    const expandedTopBar = document.getElementById("p-expanded-top-bar-wrapper");
    function animateExpandedTopBar() {
        setTimeout(() => {
            const palette = generateRandomColorPalette();
            const color = generateRandomColor(palette);
            expandedTopBar.style.borderBottomColor = color;
            window.requestAnimationFrame(animateExpandedTopBar);
        }, 800)
    }
    window.requestAnimationFrame(animateExpandedTopBar);
}

export default simpleAnimations;