function butterfly(config) {
    const { canvasId } = config;
    const canvasNode = document.getElementById(canvasId)

    const instance = {
        canvasNode,
        canvas: canvasNode.getContext("2d"),

        width: null,
        height: null,
        points: null,

        drawCircle: function () {
            this.canvas.beginPath();
            this.canvas.arc(200, 200, 50, 0, 2 * Math.PI);
            this.canvas.stroke();
            this.canvas.fillStyle = "red";
            this.canvas.fill();
        },
        init: function () {
            this.width = this.canvasNode.clientWidth;
            this.height = this.canvasNode.clientHeight;
            this.points = {
                topLeft: [0, 0],
                bottomLeft: [0, this.height],
                topRight: [this.width, 0],
                bottomRight: [this.width, this.height]
            }
            this.drawCircle();
        }
    }

    instance.init(instance);

    return instance;
}

export default butterfly;