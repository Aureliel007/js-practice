function serialProcess(list, handler) {
    return new Promise((resolve) => {
        const results = new Array(list.length);

        function processNext(index) {
            if (index >= list.length) {
                resolve(results);
                return;
            }
            handler(list[index], index, list, (result) => {
                results[index] = result;
                processNext(index + 1);
            });
        }

        processNext(0);
    });
}

module.exports = serialProcess;
