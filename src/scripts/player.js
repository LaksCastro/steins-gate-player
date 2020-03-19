import timer from "./timer";

const player = (config) => {
    const {
        playButton,
        nextButton,
        prevButton,
        volButton = document.createElement("input").setAttribute("type", "range"),
        muteButton,
        timerDisplay,
        songs,
        initOn = 0 } = config;

    const instance = {
        songs,

        playButton: document.querySelector(playButton),
        nextButton: document.querySelector(nextButton),
        prevButton: document.querySelector(prevButton),
        volButton: document.querySelector(volButton),
        muteButton: document.querySelector(muteButton),
        timerDisplay: document.querySelector(timerDisplay),

        onSongChange: null,

        currentSong: initOn,
        audio: new Audio(songs[initOn].src),

        timer,

        init: function () {
            this.playButton.onclick = () => this.togglePlaying();
            this.nextButton.onclick = () => this.next();
            this.prevButton.onclick = () => this.prev();
            // this.volButton.onchange = () => this.changeVol();
            this.muteButton.onclick = () => this.toggleMute();


            this.audio.onended = () => this.next();

            this.audio.onplay = () =>
                this.timer.startCount.call({ ...this.timer, audio: this.audio });
            this.audio.onpause = () =>
                this.timer.pauseCount.call({ ...this.timer, audio: this.audio });

            this.timer.onTimeChange = (updatedTimer) => {
                this.timer = updatedTimer
                this.timerDisplay.textContent = this.timer.getDisplayTime();
            };
        },
        play: function (audioIndex) {
            this.currentSong = audioIndex
            this.changeAudioSrc(this.songs[this.currentSong].src);
            this.audio.play();
        },
        pause: function () {
            this.audio.pause();
        },
        next: function () {
            const isLastThenRestart = this.currentSong === (this.songs.length - 1)
            const audioIndex = isLastThenRestart ? 0 : this.currentSong + 1
            this.play(audioIndex);
        },
        prev: function () {
            const isFirstThenGoToLast = this.currentSong === 0
            const audioIndex = isFirstThenGoToLast ? songs.length - 1 : this.currentSong - 1
            this.play(audioIndex);
        },
        togglePlaying: function () {
            this.audio.paused ? this.audio.play() : this.audio.pause()
        },
        toggleMute: function () {
            this.audio.muted = !this.audio.muted
        },
        changeAudioSrc: function (newSrc) {
            if (newSrc !== this.audio.src) {
                this.audio.src = newSrc;
                if (this.onSongChange) this.onSongChange(this);
            }
        },
        changeVol: function (vol) { }
    }

    return instance
}


export default player;