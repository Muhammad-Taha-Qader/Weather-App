import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CurrentForecastWeatherData } from './Weather';
import { HistoryData } from './Weather';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HourlyGraphProps {
  i: number,
  Weather: CurrentForecastWeatherData | HistoryData
}

const HourlyGraph: React.FC<HourlyGraphProps> = ({ i, Weather }) => {
  if (!Weather) {
    return <div>No data available</div>;
  }

  const hourlyArray = Weather.forecast.forecastday[i].hour.map((hourData) => hourData.temp_c);
  const labels = Weather.forecast.forecastday[i].hour.map((_, index) => `${index}:00`);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: hourlyArray,
        // borderColor: 'rgba(162, 25, 255, 1)',
        borderColor: 'rgba(104,88,245, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            display: true,
            ticks: {
              color: 'white', // Change this to your desired color
              maxTicksLimit: 10,
              stepSize: 1,
            }
          },
          y: {
            display: true,
            ticks: {
              color: 'white', // Change this to your desired color
            }
          },
        },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <div className="w-full overflow-x-auto" style={{ height: '180px' }} id='graph'>
      <div className="w-[2400px] md:w-[1200px] h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default HourlyGraph;
