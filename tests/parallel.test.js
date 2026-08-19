const Parallel = require('../src/parallel');

describe('Parallel', () => {
    test('выполняет задачи и возвращает результаты в порядке добавления', (done) => {
        const runner = new Parallel(2);
        runner
            .job((cb) => setTimeout(() => cb('A'), 30))
            .job((cb) => setTimeout(() => cb('B'), 10))
            .job((cb) => setTimeout(() => cb('C'), 5))
            .done((results) => {
                expect(results).toEqual(['A', 'B', 'C']);
                done();
            });
    });

    test('done вызывается асинхронно, если не было добавлено ни одной задачи', () => {
        const runner = new Parallel();
        let called = false;
        runner.done(() => {
            called = true;
        });
        expect(called).toBe(false);
    });

    test('не запускает задачи, пока не вызван done', () => {
        const runner = new Parallel();
        const job = jest.fn();
        runner.job(job);
        expect(job).not.toHaveBeenCalled();
    });

    test('ограничивает число одновременно выполняющихся задач лимитом', (done) => {
        const runner = new Parallel(2);
        let active = 0;
        let maxActive = 0;

        function makeJob(delay) {
            return (cb) => {
                active += 1;
                maxActive = Math.max(maxActive, active);
                setTimeout(() => {
                    active -= 1;
                    cb('done');
                }, delay);
            };
        }

        runner
            .job(makeJob(20))
            .job(makeJob(20))
            .job(makeJob(20))
            .job(makeJob(20))
            .done(() => {
                expect(maxActive).toBeLessThanOrEqual(2);
                done();
            });
    });

    test('без лимита запускает все задачи одновременно', (done) => {
        const runner = new Parallel();
        let active = 0;
        let maxActive = 0;

        function job(cb) {
            active += 1;
            maxActive = Math.max(maxActive, active);
            setTimeout(() => {
                active -= 1;
                cb('x');
            }, 10);
        }

        runner
            .job(job)
            .job(job)
            .job(job)
            .done(() => {
                expect(maxActive).toBe(3);
                done();
            });
    });
});
