const getParamNames = function (fn) {
    const match = fn.toString().match(/\(([^)]*)\)/);
    if (!match || !match[1].trim()) return [];
    return match[1].split(',').map((s) => s.trim());
};

const ForceConstructor = function (a, b, c) {
    if (!(this instanceof ForceConstructor)) {
        return new ForceConstructor(a, b, c);
    }
    const paramNames = getParamNames(ForceConstructor);
    const values = [a, b, c];
    paramNames.forEach((name, i) => {
        this[name] = values[i];
    });
};

module.exports = ForceConstructor;
