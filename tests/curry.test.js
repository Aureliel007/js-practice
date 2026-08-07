const curry = require('../src/curry');

describe('curry', () => {
    function sum2(x, y) {
        return x + y;
    }
    function sum4(a, b, c, d) {
        return a + b + c + d;
    }
    function sum1(a) {
        return a;
    }
    function sum0() {
        return 42;
    }

    test('каррирует функцию с 2 аргументами, вызванную по одному', () => {
        expect(curry(sum2)(1)(2)).toBe(3);
    });

    test('каррирует функцию с 4 аргументами, вызванную по одному', () => {
        expect(curry(sum4)(2)(3)(4)(5)).toBe(14);
    });
    test('работает с одним аргументом', () => {
        expect(curry(sum1)(7)).toBe(7);
    });

    test('работает с функцией без аргументов', () => {
        expect(curry(sum0)()).toBe(42);
    });
});
