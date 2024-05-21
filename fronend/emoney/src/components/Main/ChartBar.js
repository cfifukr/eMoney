import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function ChartBar({ expenses, incomes }) {
  const [dataChart, setDataChart] = useState({
    labels: [],
    datasets: [
      {
        label: 'Expenses',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (expenses && Object.keys(expenses).length > 0) {
      const labels = Object.keys(expenses).sort();
      const valuesExp = labels.map(date => expenses[date] * -1);
      const valuesInc = labels.map(date => incomes[date])

      setDataChart({
        labels: labels.map(date => new Date(date).toLocaleDateString('en-EN', { month: 'long', day: 'numeric' })),
        datasets: [
          {
            label: 'Expenses',
            data: valuesExp,
            backgroundColor: 'rgb(240,128,128)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },{
            label: 'Incomes',
            data: valuesInc,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [expenses]);

  return (
    <>
      {dataChart.labels.length > 0 ? (
        <Bar data={dataChart} />
      ) : (
        <div>Загрузка данных...</div>
      )}
    </>
  );
}

export default ChartBar;
