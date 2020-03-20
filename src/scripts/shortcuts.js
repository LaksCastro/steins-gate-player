const keyboard = {
    on: (shortcuts) => {
        shortcuts.forEach(short => {
            const { key, callback } = short;
            document.addEventListener("keyup", e => {
                if (e.keyCode === key) callback();
            });
        });
    }
}

export default keyboard;