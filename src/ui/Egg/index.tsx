import { useCallback, useEffect } from "react";
import { addCell } from "../../core/cellSlice";
import { EggProps, removeEgg } from "../../core/eggSlice";
import { useAppDispatch } from "../../core/store";

export default function Egg(egg: EggProps) {
  const dispatch = useAppDispatch();
  const { id, position } = egg;

  const hatch = useCallback(() => {
    dispatch(removeEgg({ id }));
    dispatch(addCell({ egg }));
  }, [dispatch, id, egg]);

  useEffect(() => {
    setTimeout(hatch, 5000 + 5000 * Math.random());
  }, [hatch]);

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
