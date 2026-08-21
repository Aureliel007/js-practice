const fetchRetry = require('../src/fetchRetry');

describe('fetchRetry', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
        delete global.fetch;
    });

    test('возвращает результат при успешном первом запросе', async () => {
        global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 200 });
        const result = await fetchRetry('https://some-random-url.com', 3, 100);
        expect(result).toEqual({ ok: true, status: 200 });
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('повторяет запрос после ошибки', async () => {
        global.fetch = jest
            .fn()
            .mockRejectedValueOnce(new Error('network error'))
            .mockResolvedValueOnce({ ok: true, status: 200 });
        const promise = fetchRetry('https://some-random-url.com', 3, 100);
        await jest.advanceTimersByTimeAsync(100);
        await expect(promise).resolves.toEqual({ ok: true, status: 200 });
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    test('если все попытки неудачны, функция должна вернуть ошибку', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('network error'));
        const promise = fetchRetry('https://some-random-url.com', 3, 100);
        promise.catch(() => {});
        await jest.advanceTimersByTimeAsync(100);
        await jest.advanceTimersByTimeAsync(100);
        await expect(promise).rejects.toThrow('network error');
        expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    test('ждёт указанную задержку между попытками', async () => {
        global.fetch = jest
            .fn()
            .mockRejectedValueOnce(new Error('fail'))
            .mockResolvedValueOnce({ ok: true, status: 200 });
        const promise = fetchRetry('https://some-random-url.com', 2, 500);
        await Promise.resolve();
        await Promise.resolve();
        expect(global.fetch).toHaveBeenCalledTimes(1);
        await jest.advanceTimersByTimeAsync(500);
        await expect(promise).resolves.toEqual({ ok: true, status: 200 });
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });
});
