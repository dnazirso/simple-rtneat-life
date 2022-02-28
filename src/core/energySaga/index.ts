import { put, takeEvery } from "redux-saga/effects";
import { depleteEnergy, computeBehaviors } from "../appSlice";

import { TICK } from "../timerSaga";

function* energySagaWorker() {
  yield put(depleteEnergy());
  yield put(computeBehaviors());
}

export default function* energySaga() {
  yield takeEvery(TICK, energySagaWorker);
}
