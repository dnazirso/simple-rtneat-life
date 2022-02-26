import {
  call,
  put,
  take,
  delay,
  race,
  takeEvery,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";

const DELAY = 1000;

export const TICK = "TICK";
const START = "START";
const STOP = "STOP";

function* timerSagaWorker() {
  yield call(delay, DELAY);
  yield put({ type: TICK });
}

export default function* timerSaga() {
  yield takeEvery([START, TICK], function* (...args) {
    yield race({
      task: call(timerSagaWorker, ...args),
      cancel: take(STOP),
    });
  });
}
