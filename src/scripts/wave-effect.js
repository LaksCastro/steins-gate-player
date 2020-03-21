import { randomIntFromInterval } from "../utils"

function toPx(num) {
    return `${num}px`
}

const wave = function () {

    const container = document.getElementById("p-wave-container");


    function init() {
        calcVariants.call(this);
    }

    function calcVariants() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.maxWaveHeight = this.height - 20;

        this.wavesLength = this.width / 12;

        if (this.wavesLength > 80) this.wavesLength = 80;

        this.waves = Array.from({ length: this.wavesLength }).map(() => {
            const singleWave = document.createElement("div");
            singleWave.classList.add("p-single-wave");
            return singleWave;
        });
    }

    const instance = {
        container,

        waves: [],
        playingAnimationsId: [],

        width: null,
        height: null,
        maxWaveHeight: null,
        wavesLength: null,

        state: null,

        usePaused: function () {
            this.state = "usePaused";
            this.playingAnimationsId.forEach(id => clearTimeout(id));
        },
        usePlaying: function () {
            this.state = "usePlaying";
            this.waves.forEach(wave => {
                let currentHeight = null;

                function animate() {
                    this.playingAnimationsId.push(setTimeout(() => {
                        let newHeight = randomIntFromInterval(0, this.maxWaveHeight);

                        if (currentHeight) {
                            if (newHeight === currentHeight) {
                                newHeight = currentHeight + 10
                            }
                            currentHeight = newHeight;
                        }

                        wave.style.height = toPx(newHeight);

                        animate.call(this);
                    }, 100));
                }
                animate.call(this);
            });
        },
        useStatic: function () {
            this.state = "useStatic";

            if (this.playingAnimationsId.length !== 0)
                this.playingAnimationsId.forEach(id => clearTimeout(id));

            this.waves.forEach(wave => {
                let currentHeight = 8;

                wave.style.height = toPx(currentHeight);
            });
        },
        reInit() {
            init.call(this);
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