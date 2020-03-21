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

        state: null,

        usePaused: function () {
            if (this.state === "usePaused") return;

            this.state = "usePaused";
            this.playingAnimationsId.forEach(id => clearTimeout(id));
        },
        usePlaying: function () {
            if (this.state === "usePlaying") return;

            this.state = "usePlaying";
            this.waves.forEach(wave => {
                let currentHeight = null;

                function animate() {
                    this.playingAnimationsId.push(setTimeout(() => {
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

                        animate.call(this);
                    }, 100));
                }
                animate.call(this);

                function changePalette() {
                    this.palette = generateRandomColorPalette({ a: 0.5 });
                    setTimeout(() => {
                        changePalette.call(this);
                    }, 3000);
                }
                setTimeout(() => {
                    changePalette.call(this);
                }, 3000);
            });
        },
        useStatic: function () {
            if (this.state === "useStatic") return;

            this.state = "useStatic";

            if (this.playingAnimationsId.length !== 0)
                this.playingAnimationsId.forEach(id => clearTimeout(id));

            this.waves.forEach(wave => {
                let currentHeight = 8;

                wave.style.height = toPx(currentHeight);
            });
        },
        reInit() {
            calcVariants.call(this);
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