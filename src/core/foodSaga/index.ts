import { put, select, takeEvery } from "redux-saga/effects";
import { CellContext, selectCell } from "../cellSlice";
import { updateFoods } from "../foodSlice";
import { TICK } from "../timerSaga";

function* foodSagaWorker() {
  const { cells }: CellContext = yield select(selectCell);
  yield put(updateFoods({ cells }));
}

export default function* foodSaga() {
  yield takeEvery([TICK], foodSagaWorker);
}
