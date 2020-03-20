function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getSecondsTime(seconds) {
    return seconds >= 10 ? seconds.toString() : `0${seconds}`;
}
function getMinutesTime(minutes) {
    return minutes >= 10 ? minutes.toString() : `0${minutes}`
}
function getDisplayTime(seconds, minutes) {
    const display = `${getMinutesTime(minutes)}:${getSecondsTime(seconds)}`;
    return display;
}
function converterSeconds(seconds) {
    const time = {
        seconds: seconds % 60,
        minutes: Math.trunc(seconds / 60),
        hours: Math.trunc(Math.trunc(seconds / 60) / 60)
    }
    return time;
}
function firstLetterUppercase(string) {
    return string.replace(/^./, string[0].toUpperCase())
}

export {
    randomIntFromInterval,
    getSecondsTime,
    getMinutesTime,
    getDisplayTime,
    converterSeconds,
    firstLetterUppercase
}