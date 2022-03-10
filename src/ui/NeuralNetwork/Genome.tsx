import { useRef, useCallback, useEffect } from "react";
import { IGenome } from "../../models/Genome";

export default function Genome({ genome }: { genome: IGenome }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.canvas.width = 220;
      ctx.canvas.height = 160;

      genome.connections.forEach((c) => {
        ctx.beginPath();
        ctx.strokeStyle = c.enabled ? "white" : "black";
        ctx.lineWidth = c.enabled ? 2 : 1;
        ctx.moveTo(c.from.x * 200 + 10, c.from.y * 120 + 10);
        ctx.lineTo(c.to.x * 200 + 10, c.to.y * 120 + 10);
        ctx.stroke();
      });

      genome.nodes.forEach((n) => {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(n.x * 200 + 10, n.y * 120 + 10, 6, 0, 2 * Math.PI);
        ctx.fill();
      });
    },
    [genome]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context) return;
    draw(context);
  }, [draw]);

  return <canvas ref={canvasRef} />;
}
