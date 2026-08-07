Function.prototype.myBind = function (context, ...boundArgs) {
    const fn = this;
    if (typeof fn !== 'function') {
        throw new TypeError('myBind must be called on a function');
    }
    function bound(...callArgs) {
        if (this instanceof bound) {
            return fn.apply(this, [...boundArgs, ...callArgs]);
        }
        return fn.apply(context, [...boundArgs, ...callArgs]);
    }
    bound.prototype = Object.create(fn.prototype || Object.prototype);
    return bound;
};
