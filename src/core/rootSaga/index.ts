import { all } from "redux-saga/effects";

import energySaga from "../energySaga";
import timerSaga from "../timerSaga";

export default function* rootSaga() {
  yield timerSaga();
  yield all([energySaga()]);
}
