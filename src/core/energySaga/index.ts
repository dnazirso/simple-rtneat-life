import { put, select, takeEvery } from "redux-saga/effects";
import { depleteEnergy, computeBehaviors } from "../cellSlice";
import { FoodContext, selectFood } from "../foodSlice";

import { TICK } from "../timerSaga";

function* energySagaWorker() {
  const { foods }: FoodContext = yield select(selectFood);
  yield put(depleteEnergy());
  yield put(computeBehaviors({ foods }));
}

export default function* energySaga() {
  yield takeEvery(TICK, energySagaWorker);
}
