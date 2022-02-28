import { put, takeEvery } from "redux-saga/effects";
import { depleteEnergy, computeOutputs } from "../appSlice";

import { TICK } from "../timerSaga";

function* energySagaWorker() {
  yield put(depleteEnergy());
  yield put(computeOutputs());
}

export default function* energySaga() {
  yield takeEvery(TICK, energySagaWorker);
}
