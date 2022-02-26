import { useEffect } from "react";
import { CellProps, depleteEnergy, removeCell } from "../../core/cellSlice";
import { useAppDispatch } from "../../core/store";

export default function Cell(cell: CellProps) {
  const dispatch = useAppDispatch();
  const { position, id, energy } = cell;

  useEffect(() => {
    const timeout = setInterval(() => {
      dispatch(depleteEnergy({ id }));
    }, 50);
    return () => {
      clearInterval(timeout);
    };
  });

  useEffect(() => {
    if (energy <= 0) {
      dispatch(removeCell({ id }));
    }
  }, [energy, dispatch, id]);

  return (
    <div
      className="Sprite"
      style={{
        height: 20,
        width: 10,
        backgroundColor: "cornflowerblue",
        borderRadius: 5,
        border: "lightgrey 1px solid",
        opacity: 0.75,
        top: position.y,
        left: position.x,
        transformOrigin: "center",
        transform: `rotate(${position.a}deg)`,
      }}
    />
  );
}
