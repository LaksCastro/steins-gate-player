import { generateRandomColorPalette, generateRandomColor } from "../utils"

function simpleAnimations() {
    const expandedTopBar = document.getElementById("p-expanded-top-bar-wrapper");
    function animateExpandedTopBar() {
        setTimeout(() => {
            const palette = generateRandomColorPalette();
            const { string } = generateRandomColor(palette);
            expandedTopBar.style.borderBottomColor = string;
            window.requestAnimationFrame(animateExpandedTopBar);
        }, 800)
    }
    window.requestAnimationFrame(animateExpandedTopBar);
}

export default simpleAnimations;