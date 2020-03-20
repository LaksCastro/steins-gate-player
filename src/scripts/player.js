import timer from "./timer";

import keyboard from "./keyboard";

import {
    randomIntFromInterval,
    getDisplayTime,
    converterSeconds,
    getSecondsTime,
    getMinutesTime
} from "../utils";

const player = (config) => {

    const {
        playButton,
        nextButton,
        prevButton,
        volRange,
        durationRange,
        muteButton,
        loopButton,
        randomButton,
        timerDisplay,
        songs,
        initOn = 0 } = config;

    const instance = {
        songs,

        randomMode: false,
        loopMode: false,

        playButton: document.querySelector(playButton),
        nextButton: document.querySelector(nextButton),
        prevButton: document.querySelector(prevButton),
        // volRange,
        durationRange: document.querySelector(durationRange),
        muteButton: document.querySelector(muteButton),
        loopButton: document.querySelector(loopButton),
        randomButton: document.querySelector(randomButton),
        timerDisplay: document.querySelector(timerDisplay),

        onInit: null,
        onSongChanged: null,
        onPlayStateChanged: null,
        onAnyModeChanged: null,

        isPaused: true,

        isChangingTime: false,
        currentSong: initOn,
        audio: new Audio(songs[initOn].src),

        timer,

        totalMinutes: null,
        totalSeconds: null,
        totalTime: null,

        allowToChangeDuration: true,

        init: function () {
            this.audio.volume = "1";

            // this.volRange.setAttribute("aria-valuenow", "100");
            this.durationRange.value = "0";

            this.actions();

            if (this.onInit) this.onInit(this);
        },
        actions: function () {
            // USER ACTIONS:

            // --- For Input Range's (volume and duration):
            // Fired when move the range button
            // this.volRange.listen("MDCSlider:input", () => this.changeVol(volRange.value));
            // // Fired when mouse up from range button
            // this.volRange.listen("MDCSlider:change", () => this.changeVol(volRange.value));


            // --- For Button Actions (play/pause, mute/unmute, next/prev, toggle loop, toggle random mode)
            // Play/Pause song
            this.playButton.onclick = () => this.togglePlaying();
            // Next
            this.nextButton.onclick = () => this.next();
            // Prev
            this.prevButton.onclick = () => this.prev();
            // Mute/Unmote
            // this.muteButton.onclick = () => this.toggleMute();
            // Toggle loop mode
            this.loopButton.onclick = () => this.toggleLoopMode();
            // Toggle random song mode
            this.randomButton.onclick = () => this.toggleRandomMode();
            // To prevent the user from being able to change the timing of the sound

            this.durationRange.onpointerdown = () => {
                this.isChangingTime = true;

                const [listener] = keyboard.on([{
                    key: 27, // Escape (Esc)
                    callback: this.cancelChangeDuration.cancel.bind(this) // Bind to use this context
                }]);

                this.cancelChangeDuration.listener = listener;
            }
            this.durationRange.onpointerup = () => {
                this.isChangingTime = false;

                keyboard.off([{
                    listenerFunction: this.cancelChangeDuration.listener
                }]);
            }

            // Fired when mouse up from range button
            this.durationRange.onchange = (e) => {
                const seconds = e.target.value;
                if (this.allowToChangeDuration) {
                    this.changeDuration(seconds);
                }
                else {
                    this.allowToChangeDuration = true;
                }
            };
            // To set display timer when user is changing time
            this.durationRange.oninput = e => {


                const { seconds, minutes } = converterSeconds(e.target.value);

                this.timerDisplay.textContent =
                    `${getDisplayTime(seconds, minutes)} - ${this.getTotalDisplayTime()}`;
            }

            // --- SIDE EFFECTS FOR USER ACTIONS
            // On action pause(), run pause timer side effect, the same for when start()
            this.audio.onpause = () => {
                this.timer.pauseCount.call({ ...this.timer, audio: this.audio });
                if (this.onPlayStateChanged) this.onPlayStateChanged(this);
            }

            // On action next()/prev(), this will make the browser load the metadata for this sound
            // We take this event and calculate the range of the duration input
            this.audio.onloadedmetadata = () => {
                this.calcDuration();
                this.calcDurationRange();
            }

            // --- CONSTANTS
            // If our user is not a time magician, they have no power over him, 
            // therefore, the timer is a constant that must be updated every 1s xD
            this.timer.onTimeChange = (updatedTimer) => {
                this.timer = updatedTimer

                // Change current time of input #duration and timer display only if user is not changing time
                this.updateTimer();
            };

            // The song end is not a user action, it's just the natural flow of time
            this.audio.onended = () => {
                if (this.loopMode) {
                    this.play(this.currentSong);
                } else {
                    this.next();
                }
            };

            // On play, start/continue timer
            this.audio.onplay = () => {
                this.timer.startCount.call({ ...this.timer, audio: this.audio });
                if (this.onPlayStateChanged) this.onPlayStateChanged(this);
            }
        },
        play: function (audioIndex) {
            if (this.randomMode) {
                // Logic to play a random song that not be the current song
                const possibleAudioIndex = randomIntFromInterval(0, this.songs.length - 1);
                if (possibleAudioIndex === audioIndex) {
                    if (possibleAudioIndex === this.songs.length - 1) {
                        audioIndex = possibleAudioIndex - 1
                    } else if (possibleAudioIndex === 0) {
                        audioIndex = possibleAudioIndex + 1
                    } else {
                        audioIndex = possibleAudioIndex + 1
                    }
                } else {
                    audioIndex = possibleAudioIndex
                }
            }
            this.currentSong = audioIndex
            this.changeAudioSrc(this.songs[this.currentSong].src, () => {
                if (!this.isPaused)
                    this.audio.play();
            });
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
            this.isPaused ? this.audio.play() : this.audio.pause();
            this.isPaused = !this.isPaused;
        },
        toggleMute: function () {
            this.audio.muted = !this.audio.muted
        },
        toggleLoopMode: function () {
            this.loopMode = !this.loopMode;
            if (this.onAnyModeChanged) this.onAnyModeChanged(this);
        },
        toggleRandomMode: function () {
            this.randomMode = !this.randomMode;
            if (this.onAnyModeChanged) this.onAnyModeChanged(this);
        },
        changeAudioSrc: function (newSrc, onChange) {
            if (newSrc !== this.audio.src) {
                this.audio.src = newSrc;
                onChange();
                if (this.onSongChanged) this.onSongChanged(this);
            }
        },
        changeVol: function (vol) {
            this.audio.volume = vol / 100;
        },
        changeDuration: function (time) {
            this.audio.currentTime = time;
        },
        calcDurationRange: function () {
            this.durationRange.max = this.audio.duration.toFixed(0);
            this.durationRange.min = "0";
        },
        calcDuration: function () {
            const { minutes, seconds } = converterSeconds(Number(this.audio.duration.toFixed(0)));
            this.totalMinutes = minutes;
            this.totalSeconds = seconds;
            this.totalTime = this.audio.duration;
        },
        getTotalDisplayTime: function () {
            return getDisplayTime(this.totalSeconds, this.totalMinutes);
        },
        getTotalDisplaySeconds: function () {
            return getSecondsTime(this.totalSeconds);
        },
        getTotalDisplayMinutes: function () {
            return getMinutesTime(this.totalMinutes);
        },
        updateTimer: function () {
            if (!this.isChangingTime) {
                this.durationRange.value = this.timer.currentTime;

                this.timerDisplay.textContent =
                    `${this.timer.getDisplayTime()} - ${this.getTotalDisplayTime()}`;
            }
        },
        cancelChangeDuration: {
            cancel: function () {
                this.isChangingTime = false;
                this.updateTimer();
                this.allowToChangeDuration = false;
            },
            listener: null
        },
    }

    return instance
}


export default player;