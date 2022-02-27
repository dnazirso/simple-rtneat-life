import { put, take, delay, race, takeEvery } from "redux-saga/effects";

const DELAY = 500;

export const TICK = "TICK";
export const START = "START";
const STOP = "STOP";

function* timerSagaWorker() {
  yield delay(DELAY);
  yield put({ type: TICK });
}

export default function* timerSaga() {
  yield takeEvery([START, TICK], function* () {
    yield race({
      task: timerSagaWorker(),
      cancel: take(STOP),
    });
  });
}
