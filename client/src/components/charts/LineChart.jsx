import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function LineChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        // Fetch data from the API
        fetch('https://dacs.onrender.com/api/v1/transcript')
            .then((response) => response.json())
            .then((data) => {
                // Extracting unique months from the data
                const uniqueMonths = [...new Set(data.map(item => new Date(item.createdAt).toLocaleString('en-US', { month: 'short' })))];

                // Initialize an empty array to store data points for each month
                const dataPointsByMonth = [];

                // Loop through unique months and count the number of items for each month
                uniqueMonths.forEach(month => {
                    const itemCount = data.filter(item => new Date(item.createdAt).toLocaleString('en-US', { month: 'short' }) === month).length;

                    dataPointsByMonth.push(itemCount);
                });

                // Update state with the collected data points and corresponding labels
                setChartData({
                    labels: uniqueMonths,
                    datasets: [{
                        label: 'Number of Requests',
                        fill: false,
                        data: dataPointsByMonth,
                        borderColor: '#6B3FA0',
                        pointBorderColor: 'transparent',
                        backgroundColor: 'red',
                        tension: 0.3,
                    }],
                });

                // Your existing options
                setChartOptions({
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Requests' },
                    },
                    scales: {
                        x: { border: { display: false }, grid: { display: false } },
                        y: { border: { display: false }, grid: { display: false } },
                    },
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // The empty dependency array ensures that the effect runs only once

    return (
        <div className='flex md:h-[250px]'>
            <Line data={chartData} options={chartOptions} className='w-auto' />
        </div>
    );
}

export default LineChart;
