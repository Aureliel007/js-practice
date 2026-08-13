const ForceConstructor = function (...args) {
    if (!new.target) {
        return new ForceConstructor(...args);
    }
    args.forEach((arg, index) => {
        this[`arg${index + 1}`] = arg;
    });
};

module.exports = ForceConstructor;
