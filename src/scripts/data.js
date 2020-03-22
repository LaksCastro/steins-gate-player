import storage from "./localstorage"
import { firstLetterUppercase } from "../utils"

const playlists = {
    opening: [],
    ending: [],
    favorite: []
}

const tabs = [{
    name: "Sounds",
}, {
    name: "Tips",
}, {
    name: "About"
}]


const { favorites } = storage();

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

    const completeItem = {
        ...item,
        name,
        cover,
        src,
        coverSrc,
        id: filename,
        favorite: favorites.some(fav => fav.filename === item.filename)
    }

    switch (item.category) {
        case "opening": playlists.opening.push(completeItem);
        case "ending": playlists.ending.push(completeItem);
    }
    if (completeItem.favorite) {
        playlists.favorite.push(completeItem);
    }

    return completeItem;
}

export {
    playlists,
    tabs
}
export default data;

