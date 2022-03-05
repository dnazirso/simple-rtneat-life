import { useRef, useCallback, useEffect } from "react";
import { ICell } from "../../models/Cell";

export default function Genome({ cell }: { cell: ICell }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.canvas.width = 220;
      ctx.canvas.height = 160;

      cell.genome.nodes.forEach((n) => {
        ctx.fillStyle = "ghostwhite";
        ctx.beginPath();
        ctx.arc(n.x * 200 + 10, n.y * 120 + 10, 10, 0, 2 * Math.PI);
        ctx.fill();
      });

      cell.genome.connections.forEach((c) => {
        ctx.beginPath();
        ctx.strokeStyle = "ghostwhite";
        ctx.moveTo(c.from.x * 200 + 10, c.from.y * 120 + 10);
        ctx.lineTo(c.to.x * 200 + 10, c.to.y * 120 + 10);
        ctx.stroke();
      });
    },
    [cell]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context) return;
    draw(context);
  }, [draw]);

  return <canvas ref={canvasRef} />;
}
