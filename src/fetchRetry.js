function fetchRetry(url, retries, delay) {
    return new Promise((resolve, reject) => {
        function attempt(remaining) {
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                    resolve(response);
                })
                .catch((error) => {
                    if (remaining <= 1) {
                        reject(error);
                        return;
                    }
                    setTimeout(() => attempt(remaining - 1), delay);
                });
        }
        attempt(retries);
    });
}

module.exports = fetchRetry;
