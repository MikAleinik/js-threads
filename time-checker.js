const { Worker } = require('worker_threads');
const chalk = require('chalk');

/**
 * @param {object} tasks
 */
function fnWrapper(tasks, breakTime = 1000) {
    const wrappedTasks = {};
    Object.entries(tasks).forEach(([name, fn]) => {
        wrappedTasks[name] = async (...args) => await infinityLoopCheckerSync(fn, args, breakTime);
    });
    return wrappedTasks;
}

/**
 * @param {Function} fn
 * @param {Array<any>} args
 * @param {number} breakTime
 */
function infinityLoopCheckerSync(fn, args, breakTime) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js');
        const calledFn = `${fn.toString()}; ${fn.name}(${args.join(',')});`;
        worker.postMessage(JSON.stringify({ fn: calledFn, args }));

        const idTimer = setTimeout(() => {
            worker.terminate();
            clearTimeout(idTimer);
            throw new Error(
                chalk.red(
                    `The execution time of ${breakTime}ms has been exceeded for the "${fn.name}" function, check your solution and rerun the test.`
                )
            );
        }, breakTime);

        worker.on('message', (result) => {
            worker.terminate();
            clearTimeout(idTimer);
            if (result.error === null) {
                resolve(result.data);
            } else {
                reject(result.error);
            }
        });
    });
}

module.exports = fnWrapper;
