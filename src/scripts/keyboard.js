const keyboard = {
    on: (shortcuts) => {
        shortcuts.forEach(short => {
            const { key, callback, node = document } = short;
            node.addEventListener("keyup", e => {
                if (e.keyCode === key) callback();
            });
        });
    },
    off: (shortcuts) => {
        shortcuts.forEach(short => {
            const { callback, node = document } = short;
            node.removeEventListener("keyup", callback, false);
        });
    },

}

export default keyboard;