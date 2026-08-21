const debounce = require('../src/debounce');

describe('debounce', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('вызывается не чаще одного раза за указанный интервал времени', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 500);
        debounced();
        expect(fn).not.toHaveBeenCalled();
        jest.advanceTimersByTime(500);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('сбрасывает таймер при повторном вызове до истечения задержки', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 500);
        debounced();
        jest.advanceTimersByTime(300);
        debounced();
        jest.advanceTimersByTime(300);
        expect(fn).not.toHaveBeenCalled();
        jest.advanceTimersByTime(200);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('частые вызовы приводят ровно к одному вызову исходной функции', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 200);
        for (let i = 0; i < 5; i += 1) {
            debounced();
            jest.advanceTimersByTime(50);
        }
        jest.advanceTimersByTime(200);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    test('аргументы корректно передаются в исходную функцию', () => {
        const fn = jest.fn();
        const debounced = debounce(fn, 100);
        debounced(1, 2);
        jest.advanceTimersByTime(50);
        debounced('a', 'b', 'c');
        jest.advanceTimersByTime(100);
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith('a', 'b', 'c');
    });

    test('сохраняет контекст (this) вызова', () => {
        const obj = {
            value: 42,
            method: jest.fn(function method() {
                return this.value;
            }),
        };
        obj.debouncedMethod = debounce(obj.method, 100);
        obj.debouncedMethod();
        jest.advanceTimersByTime(100);
        expect(obj.method.mock.instances[0]).toBe(obj);
    });
});
