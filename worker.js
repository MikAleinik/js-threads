const { parentPort } = require('worker_threads');

/**
 * @param {string} call
 */
parentPort.on('message', (call) => {
    const fnStr = JSON.parse(call);
    const result = {
        error: null,
        data: null,
    };
    try {
        result.data = eval(fnStr.fn);
    } catch (err) {
        result.error = err.message;
    }
    parentPort.postMessage(result);
});
