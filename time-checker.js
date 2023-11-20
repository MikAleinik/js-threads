const { Worker } = require('worker_threads');
const chalk = require('chalk');

/**
 * @param {Function} fn
 * @param {number} breakTime
 */
function infinityLoopCheckerSync(fn, breakTime) {
  return new Promise((resolve) => {
    const worker = new Worker('./worker.js');
    worker.postMessage(fn.toString());

    const idTimer = setTimeout(() => {
      worker.terminate();
      clearTimeout(idTimer);
      throw new Error(
        chalk.red(`The execution time of ${breakTime}ms has been exceeded for the "${fn.name}" function, check your solution and rerun the test.`)
      );
    }, breakTime);

    worker.on('message', (result) => {
      if (result) {
        worker.terminate();
        clearTimeout(idTimer);
        resolve(result);
      }
    });
  });
}

module.exports = infinityLoopCheckerSync;
