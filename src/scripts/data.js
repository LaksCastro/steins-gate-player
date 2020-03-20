import { firstLetterUppercase } from "../utils"

const data = [{
    filename: "hacking-to-the-gate.mp3",
    type: "song",
    category: "opening",
}, {
    filename: "ar-kanako-itou.mp3",
    type: "song",
    category: "opening",
}, {
    filename: "hisenkei-geniac.mp3",
    type: "song",
    category: "opening",
}, {
    filename: "skyclad-no-kansokusha.mp3",
    type: "song",
    category: "opening",
}, {
    filename: "space-engineer.mp3",
    type: "song",
    category: "opening",
}, {
    filename: "fatima.mp3",
    type: "song",
    category: "opening",
}, {
    filename: "toki-tsukasadoru.mp3",
    type: "song",
    category: "ending",
}].map(generateMetadata);

function generateMetadata(item) {
    const [filename] = item.filename.split(".");

    const name = filename.split("-").map(word => {
        return firstLetterUppercase(word);
    }).join(" ");
    const cover = `${filename}.jpg`;
    const src = require(`../assets/audios/${item.filename}`).default;
    const coverSrc = require(`../assets/images/${cover}`).default;

    return {
        ...item,
        name,
        cover,
        src,
        coverSrc,
        id: filename
    }
}


export default data;