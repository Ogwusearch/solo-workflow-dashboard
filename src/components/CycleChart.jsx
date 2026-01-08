import React, { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";

// Register necessary chart components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export default function CycleChart({ cyclesHistory }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy previous chart if exists
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: cyclesHistory.map((_, idx) => `Cycle ${idx + 1}`),
        datasets: [
          {
            label: "Completed Cycles",
            data: cyclesHistory,
            borderColor: "#0077cc",
            backgroundColor: "rgba(0, 119, 204, 0.2)",
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: "#0077cc",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
            title: {
              display: true,
              text: "Cycles",
            },
          },
          x: {
            title: {
              display: true,
              text: "Cycle Number",
            },
          },
        },
      },
    });
  }, [cyclesHistory]);

  return (
    <div style={{ width: "100%", height: "200px", marginTop: "1rem" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
