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

function moveNodeElementTo(moveEntry) {
    const { newParentId, currentParentId, nodeToMove } = moveEntry;

    const newParent = document.getElementById(newParentId);
    const oldParent = document.getElementById(currentParentId);

    oldParent.removeChild(nodeToMove);
    newParent.appendChild(nodeToMove);
}

function generateRandomColor(userConfig = {}) {
    const defaultConfig = {
        r: [0, 255],
        g: [0, 255],
        b: [0, 255],
        a: [1, 1],
    }
    const config = Object.assign({}, defaultConfig, userConfig);

    let { r, g, b, a } = config;

    let [minR, maxR] = r;
    let [minG, maxG] = g;
    let [minB, maxB] = b;
    let [minA, maxA] = a;

    maxA *= 1000;
    minA *= 1000;

    r = randomIntFromInterval(minR, maxR);
    g = randomIntFromInterval(minG, maxG);
    b = randomIntFromInterval(minB, maxB);
    a = randomIntFromInterval(minA, maxA) / 1000;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}


export {
    randomIntFromInterval,
    getSecondsTime,
    getMinutesTime,
    getDisplayTime,
    converterSeconds,
    firstLetterUppercase,
    moveNodeElementTo,
    generateRandomColor
}