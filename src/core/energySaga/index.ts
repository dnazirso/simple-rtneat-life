import { put, takeEvery } from "redux-saga/effects";

import { depleteEnergy } from "../cellSlice";
import { TICK } from "../timerSaga";

function* energySagaWorker() {
  yield put(depleteEnergy());
}

export default function* energySaga() {
  yield takeEvery(TICK, energySagaWorker);
}
