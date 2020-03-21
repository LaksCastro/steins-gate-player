function useLocalStorage() {

    function objectToJson(obj) {
        return JSON.stringify(obj)
    }
    function jsonToObject(json) {
        return JSON.parse(json);
    }
    const instance = {
        favorites: localStorage.getItem("favorites") ? jsonToObject(localStorage.getItem("favorites")) : [],

        enum: {
            FAVORITES: "favorites"
        },
        // addFavorite: function (song) {
        //     this.favorites.push(song);
        //     this.storage.set(this.enum.FAVORITES), objectToJson(this.favorites);
        // },
        // removeFavorite: function (song) {
        //     const newFavorites = this.favorites.filter(fav => fav.filename !== song.filename);
        // },
        setFavorites: function (favorites) {
            this.storage.set(this.enum.FAVORITES, objectToJson(favorites));
        },
        storage: {
            set: function (key, value) {
                localStorage.setItem(key, value);
            },
        },
    }

    return instance;
}

export default useLocalStorage;