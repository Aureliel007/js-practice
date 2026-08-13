const ForceConstructor = require('../src/forceConstructor');

describe('ForceConstructor', () => {
    test('работает с new и раскладывает аргументы по именам параметров', () => {
        const obj = new ForceConstructor(1, 2, 3);
        expect(obj).toEqual({ arg1: 1, arg2: 2, arg3: 3 });
        expect(obj instanceof ForceConstructor).toBe(true);
    });

    test('работает без new и даёт тот же результат', () => {
        const obj = ForceConstructor(1, 2, 3);
        expect(obj).toEqual({ arg1: 1, arg2: 2, arg3: 3 });
        expect(obj instanceof ForceConstructor).toBe(true);
    });
});
