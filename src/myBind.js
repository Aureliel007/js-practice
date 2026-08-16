Function.prototype.myBind = function (context, ...boundArgs) {
    const fn = this;
    function bound(...callArgs) {
        if (this instanceof bound) {
            return fn.apply(this, [...boundArgs, ...callArgs]);
        }
        return fn.apply(context, [...boundArgs, ...callArgs]);
    }
    bound.prototype = Object.create(fn.prototype || Object.prototype);
    return bound;
};
