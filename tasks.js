/**
 * @param {number} num
 * @param {number} num2
 * @returns
 */
function summTask(num, num2) {
    const res = num + num2;
    return res;
}

function notImplementedTask() {
    throw new Error('Not implemented');
}

function infinityLoopTask() {
    for (let i = 0; i < 10; i += 1) {
        i -= 1;
    }
    return res;
}

module.exports = {
    summTask,
    notImplementedTask,
    infinityLoopTask,
};
