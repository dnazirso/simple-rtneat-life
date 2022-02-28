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
      className="Sprite Egg"
      style={{
        top: position.y,
        left: position.x,
      }}
    />
  );
}
