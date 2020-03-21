import { randomIntFromInterval } from "../utils"

let wrapper = null;
let waves = [];
let playingAnimationsId = [];


function toPx(num) {
    return `${num}px`
}

function init() {
    wrapper = document.getElementById("p-wave-container");
    const width = wrapper.clientWidth;
    const wavesLength = width / 12 - 4;
    console.log(wavesLength);
    waves = Array.from({ length: wavesLength }).map(() => {
        const singleWave = document.createElement("div");
        singleWave.classList.add("p-single-wave");
        return singleWave;
    });
}

function render() {
    waves.forEach(wave => {
        wrapper.appendChild(wave);
    });
}

function usePlaying() {
    waves.forEach(wave => {
        let currentHeight = null;

        function animate() {
            playingAnimationsId.push(setTimeout(() => {
                let newHeight = randomIntFromInterval(0, 55);

                if (currentHeight) {
                    if (newHeight === currentHeight) {
                        newHeight = currentHeight + 10
                    }
                    currentHeight = newHeight;
                }

                wave.style.height = toPx(newHeight);

                animate();
            }, 100));
        }
        animate();
    });
}

function usePaused() {
    playingAnimationsId.forEach(id => clearTimeout(id));
}

function useStatic() {
    if (playingAnimationsId.length !== 0) {
        playingAnimationsId.forEach(id => clearTimeout(id));
    }

    waves.forEach(wave => {
        let currentHeight = 8;

        wave.style.height = toPx(currentHeight);
    });
}

export default {
    usePlaying,
    usePaused,
    useStatic,
    render,
    init
};