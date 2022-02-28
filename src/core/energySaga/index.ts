import { put, takeEvery } from "redux-saga/effects";

import { computeOutputs, depleteEnergy } from "../cellSlice";
import { TICK } from "../timerSaga";

function* energySagaWorker() {
  yield put(depleteEnergy());
  yield put(computeOutputs());
}

export default function* energySaga() {
  yield takeEvery(TICK, energySagaWorker);
}
