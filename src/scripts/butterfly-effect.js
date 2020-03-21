import { generateRandomColor } from "../utils"

const circle = function (config) {

    const instance = {
        drawPixel: function (x, y) {
            this.canvas.fillRect(x - 2, y, 4, 4);
        },
        drawCircle: function () {
            this.canvas.beginPath();

            const newPosition = [
                this.circle.position[0] + 1,
                this.circle.position[1] + 1
            ]

            this.canvas.arc(
                newPosition[0],
                newPosition[1],
                this.circle.r,
                0,
                2 * Math.PI
            );

            this.circle.position = newPosition;

            // this.canvas.stroke();

            this.canvas.fillStyle = "green";


            this.pixels.forEach(pixel => this.drawPixel(pixel[0], pixel[1]));

            this.canvas.fill();

            this.pixels.push(newPosition);
        }
    }

    instance.init.bind(instance);

    return instance;
}

function butterfly(config) {
    const { canvasId, canvasWrapperId } = config;
    const canvasNode = document.getElementById(canvasId);
    const canvasWrapper = document.getElementById(canvasWrapperId);

    const instance = {
        canvasWrapper,
        canvasNode,

        canvas: null,

        width: null,
        height: null,
        points: null,

        circle: {
            size: 30,
            r: 15,
            position: [0, 0],
        },

        pixels: [],

        animationId: null,

        animate: function () {
            this.canvas.clearRect(0, 0, this.width, this.height);

            function animeCanvas() {
                this.animationId = setTimeout(() => {
                    this.canvas.clearRect(0, 0, this.width, this.height);
                    this.drawCircle.call(this);
                    window.requestAnimationFrame(animeCanvas.bind(this));
                }, 5);
            }
            window.requestAnimationFrame(animeCanvas.bind(this));
        },
        init: function () {
            this.width = this.canvasWrapper.clientWidth;
            this.height = this.canvasWrapper.clientHeight;

            this.canvasNode.width = this.width;
            this.canvasNode.height = this.height;

            this.canvas = this.canvasNode.getContext("2d");

            this.points = {
                topLeft: [0, 0],
                bottomLeft: [0, this.height],
                topRight: [this.width, 0],
                bottomRight: [this.width, this.height]
            }
            this.animate();
        }
    }

    instance.init.call(instance);

    return instance;
}

export default butterfly;