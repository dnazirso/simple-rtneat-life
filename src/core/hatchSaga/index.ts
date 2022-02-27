import { delay, put, spawn, take } from "redux-saga/effects";
import { addCell } from "../cellSlice";
import { EggProps, removeEgg } from "../eggSlice";

const DELAY = 4000;

export const HATCH = "HATCH";

function* hatch({ egg }: { egg: EggProps }) {
  yield delay(DELAY + 1000 * Math.random());
  yield put(removeEgg({ id: egg.id }));
  yield put(addCell({ egg }));
}

export default function* hatchSaga() {
  while (true) {
    const { payload } = yield take("HATCH");
    yield spawn(hatch, payload);
  }
}
