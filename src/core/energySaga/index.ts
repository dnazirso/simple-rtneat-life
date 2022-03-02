import { put, select, takeEvery } from "redux-saga/effects";
import { depleteEnergy, computeBehaviors } from "../cellSlice";
import { FoodContext, IFood, selectFood } from "../foodSlice";

import { TICK } from "../timerSaga";

function* energySagaWorker(foods: IFood[]) {
  yield put(depleteEnergy());
  yield put(computeBehaviors({ foods }));
}

export default function* energySaga() {
  const { foods }: FoodContext = yield select(selectFood);
  yield takeEvery(TICK, energySagaWorker, foods);
}
