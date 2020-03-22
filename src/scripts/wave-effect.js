import { randomIntFromInterval, generateRandomColor, generateRandomColorPalette } from "../utils"

function toPx(num) {
    return `${num}px`
}

const wave = function () {

    const container = document.getElementById("p-wave-container");

    function init() {
        calcVariants.call(this);

        this.waves = Array.from({ length: this.wavesLength }).map(() => {
            const singleWave = document.createElement("div");
            singleWave.classList.add("p-single-wave");
            return singleWave;
        });
    }

    function calcVariants() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.maxWaveHeight = this.height - 20;

        const waveWidth = 16;
        const waveMargin = 4;

        this.wavesLength = this.width / (waveWidth + (waveMargin * 2));

        if (this.wavesLength > 80) this.wavesLength = 80;
    }

    const instance = {
        container,

        waves: [],
        playingAnimationsId: [],

        width: null,
        height: null,
        maxWaveHeight: null,
        wavesLength: null,

        palette: generateRandomColorPalette({ a: 0.5 }),
        paletteAnimationId: null,

        topBarAnimationId: null,

        state: null,

        usePaused: function () {
            if (this.state === "usePaused") return;

            this.state = "usePaused";
            this.playingAnimationsId.forEach(id => clearTimeout(id));
            clearTimeout(this.paletteAnimationId);
            clearTimeout(this.topBarAnimationId);
        },
        updateWave: function (wave, currentHeight) {
            let newHeight = randomIntFromInterval(0, this.maxWaveHeight);
            let { string: newColor } = generateRandomColor(this.palette);

            if (currentHeight) {
                if (newHeight === currentHeight) {
                    newHeight = currentHeight + 10
                }
                currentHeight = newHeight;
            }

            wave.style.height = toPx(newHeight);
            wave.style.backgroundColor = newColor;
        },
        usePlaying: function () {
            if (this.state === "usePlaying") return;

            this.state = "usePlaying";
            this.waves.forEach(wave => {
                let currentHeight = null;

                function animate() {
                    this.playingAnimationsId.push(setTimeout(() => {
                        this.updateWave(wave, currentHeight);

                        animate.call(this);
                    }, 100));
                }
                animate.call(this);
            });

            function changePalette() {
                this.paletteAnimationId = setTimeout(() => {
                    if (this.state !== "usePlaying") return;
                    this.palette = generateRandomColorPalette({ a: 0.2 }, { vA: 200 });
                    changePalette.call(this);
                }, 5000);
            }
            changePalette.call(this);
        },
        useStatic: function () {
            if (this.state === "useStatic") return;

            this.state = "useStatic";

            if (this.playingAnimationsId.length !== 0) {
                this.playingAnimationsId.forEach(id => clearTimeout(id));
            }
            if (typeof this.paletteAnimationId !== "null") {
                clearTimeout(this.paletteAnimationId);
            }
            if (typeof this.topBarAnimationId !== "null") {
                clearTimeout(this.topBarAnimationId);
            }

            this.waves.forEach(wave => {
                let currentHeight = 5;

                wave.style.height = toPx(currentHeight);
            });
        },
        reInit() {
            calcVariants.call(this);
            if (this.state === "usePaused")
                this.waves.forEach(wave => this.updateWave(wave, wave.clientHeight));
        },
        render: function () {
            this.waves.forEach(wave => {
                this.container.appendChild(wave);
            });
        },
    }

    init.call(instance);

    return instance;
}

export default wave;