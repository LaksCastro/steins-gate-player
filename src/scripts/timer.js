const timer = {
    id: null,
    minutes: 0,
    seconds: 0,
    onTimeChange: null,
    // hours: 0,
    startCount: function () {
        const everySecondRunThis = () => {
            this.id = setTimeout(() => {
                const currentTime = this.audio.currentTime.toFixed(0);

                this.seconds = currentTime % 60;
                this.minutes = Math.trunc(currentTime / 60);
                // this.hours = Math.trunc(this.minutes / 60);

                if (this.onTimeChange) this.onTimeChange(this);

                everySecondRunThis();
            }, 1000)
        }
        everySecondRunThis();
    },
    pauseCount: function () {
        clearTimeout(this.id)
    },
    getDisplayTime: function () {
        const minutes = this.getDisplayMinutes();
        const seconds = this.getDisplaySeconds();
        const display = `${minutes}:${seconds}`;
        return display;
    },
    getDisplaySeconds: function () {
        return this.seconds >= 10 ? this.seconds.toString() : `0${this.seconds}`;
    },
    getDisplayMinutes: function () {
        return this.minutes >= 10 ? this.minutes.toString() : `0${this.minutes}`
    }
}

export default timer;