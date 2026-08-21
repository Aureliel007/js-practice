function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        const context = this;

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            timer = null;
            fn.apply(context, args);
        }, delay);
    };
}

module.exports = debounce;
