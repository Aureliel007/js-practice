const serialProcess = require('../src/serialProcess');

describe('serialProcess', () => {
    test('обрабатывает элементы строго по очереди', async () => {
        const order = [];
        const result = await serialProcess(
            [3, 1, 2],
            (el, index, list, doneCb) => {
                order.push(`start-${el}`);
                setTimeout(() => {
                    order.push(`end-${el}`);
                    doneCb(el * el);
                }, el * 10);
            }
        );

        expect(result).toEqual([9, 1, 4]);
        expect(order).toEqual([
            'start-3',
            'end-3',
            'start-1',
            'end-1',
            'start-2',
            'end-2',
        ]);
    });

    test('работает с синхронным обработчиком', async () => {
        const result = await serialProcess(
            [1, 2, 3],
            (el, index, list, doneCb) => {
                doneCb(el + 1);
            }
        );
        expect(result).toEqual([2, 3, 4]);
    });
});
