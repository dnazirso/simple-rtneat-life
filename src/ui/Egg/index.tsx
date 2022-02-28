import { useEffect } from "react";
import { EggProps } from "../../core/eggSlice";
import { HATCH } from "../../core/hatchSaga";
import { useAppDispatch } from "../../core/store";

export default function Egg(egg: EggProps) {
  const dispatch = useAppDispatch();
  const { position } = egg;

  useEffect(() => {
    dispatch({ type: HATCH, payload: { egg } });
  }, [dispatch, egg]);

  return (
    <div
      className="Sprite"
      style={{
        height: 5,
        width: 5,
        backgroundColor: "wheat",
        borderRadius: 5,
        border: "lightgrey 1px solid",
        top: position.y,
        left: position.x,
      }}
    />
  );
}
