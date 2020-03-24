import storage from "./localstorage"
import { firstLetterUppercase } from "../utils"
import dataJson from "./data.json"

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

const data = dataJson.map(generateMetadata);


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
        favorite: favorites.some(fav => fav.filename === item.filename),
        playlist: "all"
    }

    switch (item.category) {
        case "opening": playlists.opening.push(completeItem); break;
        case "ending": playlists.ending.push(completeItem); break;
    }
    if (completeItem.favorite) {
        playlists.favorite.push(completeItem);
    }

    return completeItem;
}

const categories = [{
    name: "All",
    getSongs: () => data
}, {
    name: "Favorites",
    getSongs: () => playlists.favorite
}, {
    name: "Openings",
    getSongs: () => playlists.opening
}, {
    name: "Endings",
    getSongs: () => playlists.ending
}]

export {
    tabs,
    categories
}
export default data;

