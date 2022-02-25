import { useEffect } from "react";
import { removeEgg } from "../../core/eggSlice";
import { useAppDispatch } from "../../core/store";

export default function Egg({
  x,
  y,
  id,
}: {
  x: number;
  y: number;
  id: string;
}) {
  const dispatch = useAppDispatch();

  const hatch = () => {
    dispatch(removeEgg({ id }));
  };

  useEffect(() => {
    setTimeout(hatch, 5000 + 5000 * Math.random());
  }, []);

  return (
    <div
      className="Sprite"
      style={{
        height: 5,
        width: 5,
        backgroundColor: "wheat",
        borderRadius: 5,
        border: "lightgrey 1px solid",
        top: y,
        left: x,
      }}
    />
  );
}
