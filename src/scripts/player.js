import timer from "./timer";

import {
    randomIntFromInterval,
    getDisplayTime,
    converterSeconds
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
        loopMode: true,
        autoplay: true,

        playButton: document.querySelector(playButton),
        nextButton: document.querySelector(nextButton),
        prevButton: document.querySelector(prevButton),
        volRange: document.querySelector(volRange),
        durationRange: document.querySelector(durationRange),
        muteButton: document.querySelector(muteButton),
        loopButton: document.querySelector(loopButton),
        randomButton: document.querySelector(randomButton),
        timerDisplay: document.querySelector(timerDisplay),

        onSongChange: null,

        isChangingTime: false,
        currentSong: initOn,
        audio: new Audio(songs[initOn].src),

        timer,

        init: function () {
            this.audio.autoplay = true;
            this.audio.volume = "1";

            this.volRange.value = "100";
            this.durationRange.value = "0";

            this.actions();
        },
        actions: function () {
            // USER ACTIONS:

            // --- For Input Range's (volume and duration):
            // Fired when move the range button
            this.volRange.oninput = (e) => this.changeVol(e.target.value);
            // Fired when mouse up from range button
            this.volRange.onchange = (e) => this.changeVol(e.target.value);


            // --- For Button Actions (play/pause, mute/unmute, next/prev, toggle loop, toggle random mode)
            // Play/Pause song
            this.playButton.onclick = () => this.togglePlaying();
            // Next
            this.nextButton.onclick = () => this.next();
            // Prev
            this.prevButton.onclick = () => this.prev();
            // Mute/Unmote
            this.muteButton.onclick = () => this.toggleMute();
            // Toggle loop mode
            this.loopButton.onclick = () => this.toggleLoopMode();
            // Toggle random song mode
            this.randomButton.onclick = () => this.toggleRandomMode();
            // To prevent the user from being able to change the timing of the sound
            this.durationRange.onmousedown = () => this.isChangingTime = true
            this.durationRange.onmouseup = () => this.isChangingTime = false
            // Fired when mouse up from range button
            this.durationRange.onchange = (e) => {
                const seconds = e.target.value;
                this.changeDuration(seconds);
            };

            // --- SIDE EFFECTS FOR USER ACTIONS
            // On action pause(), run pause timer side effect, the same for when start()
            this.audio.onpause = () =>
                this.timer.pauseCount.call({ ...this.timer, audio: this.audio });

            // On action next()/prev(), this will make the browser load the metadata for this sound
            // We take this event and calculate the range of the duration input
            this.audio.onloadedmetadata = () => this.calcDurationRange(this.audio.duration);

            // --- CONSTANTS
            // If our user is not a time magician, they have no power over him, 
            // therefore, the timer is a constant that must be updated every 1s
            this.timer.onTimeChange = (updatedTimer) => {
                this.timer = updatedTimer
                this.timerDisplay.textContent = this.timer.getDisplayTime();

                // Change current time of input #duration only if user is not changing time
                if (!this.isChangingTime)
                    this.durationRange.value = this.timer.currentTime;
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
        toggleLoopMode: function () {
            this.loopMode = !this.loopMode;
        },
        toggleRandomMode: function () {
            this.randomMode = !this.randomMode;
        },
        changeAudioSrc: function (newSrc) {
            if (newSrc !== this.audio.src) {
                this.audio.src = newSrc;
                this.calcDurationRange(this.audio.duration);
                if (this.onSongChange) this.onSongChange(this);
            }
        },
        changeVol: function (vol) {
            this.audio.volume = vol / 100;
        },
        changeDuration: function (time) {
            this.audio.currentTime = time;
        },
        calcDurationRange: function (totalDuration) {
            this.durationRange.max = totalDuration.toFixed(0);
            this.durationRange.min = "0";
        }
    }

    return instance
}


export default player;