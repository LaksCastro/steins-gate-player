import { randomIntFromInterval } from "../utils"


function toPx(num) {
    return `${num}px`
}

const wave = function () {

    const instance = {
        container: null,

        waves: [],
        playingAnimationsId: [],

        width: null,
        height: null,
        maxWaveHeight: null,
        wavesLength: null,


        usePaused: function () {
            this.playingAnimationsId.forEach(id => clearTimeout(id));
        },
        usePlaying: function () {
            this.waves.forEach(wave => {
                let currentHeight = null;

                function animate() {
                    playingAnimationsId.push(setTimeout(() => {
                        let newHeight = randomIntFromInterval(0, maxWaveHeight);

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
                animate.call(this);

            });

        },
        useStatic: function () {
            if (playingAnimationsId.length !== 0) {
                playingAnimationsId.forEach(id => clearTimeout(id));
            }

            this.waves.forEach(wave => {
                let currentHeight = 8;

                wave.style.height = toPx(currentHeight);
            });

        },
        init: function () {
            this.container = document.getElementById("p-wave-container");

            this.width = this.container.clientWidth;
            this.height = this.container.clientHeight;
            this.maxWaveHeight = height - 20;

            this.wavesLength = width / 12;

            if (wavesLength > 80) wavesLength = 80;

            this.waves = Array.from({ length: wavesLength }).map(() => {
                const singleWave = document.createElement("div");
                singleWave.classList.add("p-single-wave");
                return singleWave;
            });
        },
        render: function () {
            this.waves.forEach(wave => {
                this.container.appendChild(wave);
            });
        }
    }
    return instance;
}

export default wave;