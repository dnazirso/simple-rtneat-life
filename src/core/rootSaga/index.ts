import { all, call } from "redux-saga/effects";
import energySaga from "../energySaga";
import hatchSaga from "../hatchSaga";
import timerSaga from "../timerSaga";

export default function* rootSaga() {
  yield all([call(timerSaga), call(energySaga), call(hatchSaga)]);
}
