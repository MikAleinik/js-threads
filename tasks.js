const infinityLoopCheckerSync = require('./time-checker');

function firstTask() {
  const res = [0, 1, 2];
  for (let i = 0; i < 10; i += 1) {
    res[0] = i;
  }
  return res;
}

function secondTask() {
  const res = [3, 4, 5];
  for (let i = 0; i < 1000; i += 1) {
    res[0] = i;
  }
  return res;
}

function infinityTask() {
  const res = [6, 7, 8];
  for (let i = 0; i < 1000; i += 1) {
    res[0] = i;
    i -= 1;
  }
  return res;
}

const time = 1000;

infinityLoopCheckerSync(firstTask, time).then((result) =>
  console.log('firstTask result = ', result)
);
infinityLoopCheckerSync(secondTask, time).then((result) =>
  console.log('secondTask result = ', result)
);
infinityLoopCheckerSync(infinityTask, time).then((result) =>
  console.log('infinityTask result = ', result)
);
