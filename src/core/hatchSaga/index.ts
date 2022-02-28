import { delay, put, spawn, take, takeEvery } from "redux-saga/effects";
import IEgg from "../../models/EggModel";
import { addCell } from "../appSlice";
import { TICK } from "../timerSaga";

export const HATCH = "HATCH";
const HATCH_TICK_DELAY = 10;

let nbTickPerEgg: { [EggId: IEgg["id"]]: number } = {};

function* hatch({ egg }: { egg: IEgg }) {
  if (!nbTickPerEgg[egg.id]) {
    nbTickPerEgg[egg.id] = 0;
  }
  if (nbTickPerEgg[egg.id] < HATCH_TICK_DELAY) {
    nbTickPerEgg[egg.id]++;
    return;
  }
  yield delay(2000 * Math.random());
  yield put(addCell({ egg }));
  delete nbTickPerEgg[egg.id];
}

export default function* hatchSaga() {
  yield takeEvery([TICK], function* () {
    while (true) {
      const { payload } = yield take("HATCH");
      yield spawn(hatch, payload);
    }
  });
}
