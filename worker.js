const { parentPort } = require('worker_threads');

/**
 * @param {string} fnStr
 */
parentPort.on('message', (fnStr) => {
  const startIndex = fnStr.indexOf('{');
  const endIndex = fnStr.lastIndexOf('}');
  const fnStrBody = fnStr.substring(startIndex + 1, endIndex);
  // eslint-disable-next-line no-new-func
  const fn = new Function(fnStrBody);
  const result = fn();
  parentPort.postMessage(result);
});
