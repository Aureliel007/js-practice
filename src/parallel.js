class Parallel {
    constructor(limit) {
        if (limit !== undefined && typeof limit !== 'number') {
            throw new TypeError('limit must be a number');
        }
        this.limit = limit === undefined ? Infinity : limit;
        this.jobs = [];
    }

    job(fn) {
        this.jobs.push(fn);
        return this;
    }

    done(cb) {
        const jobs = this.jobs;
        const results = new Array(jobs.length);
        if (jobs.length === 0) {
            setTimeout(() => cb(results), 0);
            return this;
        }

        let started = 0;
        let completed = 0;

        const runNext = () => {
            if (started >= jobs.length) return;
            const index = started;
            started += 1;
            jobs[index]((result) => {
                results[index] = result;
                completed += 1;

                if (completed === jobs.length) {
                    cb(results);
                } else {
                    runNext();
                }
            });
        };

        const initialBatch = Math.min(this.limit, jobs.length);
        for (let i = 0; i < initialBatch; i += 1) {
            runNext();
        }

        return this;
    }
}

module.exports = Parallel;
