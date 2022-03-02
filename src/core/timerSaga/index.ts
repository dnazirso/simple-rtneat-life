import { put, take, delay, race, takeEvery, select } from "redux-saga/effects";
import { selectSettings, SettingsContext } from "../settingsSlice";

export const TICK = "TICK";
export const START = "START";
export const STOP = "STOP";

function* timerSagaWorker() {
  const { settings }: SettingsContext = yield select(selectSettings);
  yield delay(settings.tickDelay);
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
