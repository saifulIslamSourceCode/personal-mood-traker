import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const dummyTransactions = [
  { mood: "Happy", date: "2025-06-30T09:00:00" },  // Monday
  { mood: "Happy", date: "2025-07-01T14:00:00" },  // Tuesday
  { mood: "Sad", date: "2025-07-02T18:00:00" },    // Wednesday
  { mood: "Neutral", date: "2025-07-03T11:30:00" },// Thursday
  { mood: "Happy", date: "2025-07-04T08:45:00" },  // Friday
  { mood: "Excited", date: "2025-07-05T21:10:00" },// Saturday
  { mood: "Sad", date: "2025-07-06T13:00:00" },    // Sunday
];

const WeeklyMoodChart = () => {
  const moodCounts = useMemo(() => {
    const counts = {};
    const now = new Date("2025-07-06T23:59:59");
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    dummyTransactions.forEach((t) => {
      const mood = t.mood;
      const dateString = t.date;
      const d = new Date(dateString);
      if (!mood || Number.isNaN(d.getTime())) return;
      if (d >= monday && d <= now) {
        counts[mood] = (counts[mood] || 0) + 1;
      }
    });

    return counts;
  }, []);

  const labels = Object.keys(moodCounts);

  // Find happy count
  const happyCount = moodCounts["Happy"] || 0;

  // For other moods, set a fixed smaller height (e.g., 1)
  const dataValues = labels.map((label) =>
    label === "Happy" ? happyCount : 1
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Times selected",
        data: dataValues,
        backgroundColor: labels.map((label, i) =>
          label === "Happy" ? "hsl(120, 70%, 50%)" : "hsl(0, 0%, 70%)"
        ),
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        max: Math.max(...dataValues) + 1, // add some space on top
      },
    },
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h3 className="text-center my-3">Weekly Mood Chart</h3>
      <Bar data={data} options={options} height={300} />
    </div>
  );
};

export default WeeklyMoodChart;
