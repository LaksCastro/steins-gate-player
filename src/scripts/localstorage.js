function useLocalStorage() {

    function objectToJson(obj) {
        return JSON.stringify(obj)
    }
    const instance = {
        favorites: localStorage.getItem("favorites") || [],

        enum: {
            FAVORITES: "favorites"
        },
        addFavorite: function (song) {
            this.favorites.push(song);
            this.storage.set(this.enum.FAVORITES), objectToJson(this.favorites);
        },
        removeFavorite: function (song) {
            const newFavorites = this.favorites.filter(fav => fav.filename !== song.filename);
            this.storage.set(this.enum.FAVORITES, objectToJson(newFavorites));
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