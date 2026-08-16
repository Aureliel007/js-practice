const promisify = require('../src/promisify');

describe('promisify', () => {
    function sum(a, b, cb) {
        setTimeout(() => cb(null, a + b), 100);
    }

    function fail(a, b, cb) {
        setTimeout(() => cb('Ошибка'), 100);
    }

    test('проверка обработки успешного результата', async () => {
        const promisifiedSum = promisify(sum);
        await expect(promisifiedSum(2, 3)).resolves.toBe(5);
    });

    test('проверка на обработку ошибки', async () => {
        const promisifiedFail = promisify(fail);
        await expect(promisifiedFail(2, 3)).rejects.toBe('Ошибка');
    });
});
