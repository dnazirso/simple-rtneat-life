import { put, takeEvery } from "redux-saga/effects";
import { depleteEnergy, computeBehaviors, computeCollision } from "../appSlice";

import { TICK } from "../timerSaga";

function* energySagaWorker() {
  yield put(depleteEnergy());
  yield put(computeBehaviors());
  yield put(computeCollision());
}

export default function* energySaga() {
  yield takeEvery(TICK, energySagaWorker);
}
