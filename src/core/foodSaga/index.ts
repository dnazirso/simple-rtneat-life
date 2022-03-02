import { put, spawn, take, takeEvery } from "redux-saga/effects";
import { IFood, updateFoods } from "../foodSlice";
import { TICK } from "../timerSaga";

export const EAT = "EAT";

function* foodSagaWorker({ foods }: { foods: IFood[] }) {
  yield put(updateFoods({ foods }));
}

export default function* foodSaga() {
  yield takeEvery([TICK], function* () {
    while (true) {
      const { payload } = yield take(EAT);
      yield spawn(foodSagaWorker, payload);
    }
  });
}
