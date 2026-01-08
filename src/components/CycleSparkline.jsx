
import React, { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";

// Register necessary chart components
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

export default function CycleSparkline({ cyclesHistory }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy previous chart if exists
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: cyclesHistory.map((_, idx) => idx + 1),
        datasets: [
          {
            data: cyclesHistory,
            borderColor: "#0077cc",
            backgroundColor: "rgba(0, 119, 204, 0.2)",
            tension: 0.4,
            fill: true,
            pointRadius: 0, // no dots, just line
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { display: false },
          y: { display: false },
        },
        elements: {
          line: { borderWidth: 2 },
        },
      },
    });
  }, [cyclesHistory]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "40px" }} />;
}
