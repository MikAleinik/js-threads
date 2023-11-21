const sourceTasks = require('./tasks');
const fnWrapper = require('./time-checker');

const tasks = fnWrapper(sourceTasks);

tasks
    .summTask(100, 200)
    .then((res) => console.log(res))
    .catch((res) => console.log(res));

tasks
    .notImplementedTask()
    .then((res) => console.log(res))
    .catch((res) => console.log(res));

tasks
    .infinityLoopTask()
    .then((res) => console.log(res))
    .catch((res) => console.log(res));
